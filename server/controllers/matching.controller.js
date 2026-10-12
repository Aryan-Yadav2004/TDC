import crypto from 'crypto';
import { matchingService } from '../services/matching.service.js';
import { aiService } from '../services/ai.service.js';
import { matchRepository } from '../repositories/match.repository.js';
import { clientRepository } from '../repositories/client.repository.js';
import { noteRepository } from '../repositories/note.repository.js';

export const matchingController = {
  getRankedMatches(req, res, next) {
    try {
      const { customerId } = req.params;
      const { city, minAge, maxAge, maritalStatus } = req.query;

      const filters = {
        city: city || null,
        minAge: minAge ? parseInt(minAge, 10) : null,
        maxAge: maxAge ? parseInt(maxAge, 10) : null,
        maritalStatus: maritalStatus || null
      };

      const result = matchingService.getRankedMatches(customerId, filters);

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (err) {
      next(err);
    }
  },

  async generatePitch(req, res, next) {
    try {
      const { customerId, candidateId } = req.params;
      const { tone = 'warm_concierge' } = req.body;

      const customer = clientRepository.findById(customerId);
      const candidate = clientRepository.findById(candidateId);

      if (!customer || !candidate) {
        return res.status(404).json({
          success: false,
          message: 'Customer or candidate profile not found'
        });
      }

      const matchmakerName = req.user.name || 'Senior Matchmaker';
      const pitch = await aiService.generateIntroPitch({
        customer,
        candidate,
        matchmakerName,
        tone
      });

      return res.status(200).json({
        success: true,
        data: pitch
      });
    } catch (err) {
      next(err);
    }
  },

  async getReasoning(req, res, next) {
    try {
      const { customerId, candidateId } = req.params;

      const customer = clientRepository.findById(customerId);
      const candidate = clientRepository.findById(candidateId);

      if (!customer || !candidate) {
        return res.status(404).json({
          success: false,
          message: 'Customer or candidate profile not found'
        });
      }

      const evaluation = matchingService.calculateCompatibility(customer, candidate);

      const reasoning = await aiService.generateMatchReasoning({
        customer,
        candidate,
        scoreBreakdown: evaluation.breakdown,
        strengths: evaluation.strengths,
        watchouts: evaluation.watchouts
      });

      return res.status(200).json({
        success: true,
        data: {
          compatibilityScore: evaluation.totalScore,
          matchTier: evaluation.matchTier,
          scoreBreakdown: evaluation.breakdown,
          reasoning
        }
      });
    } catch (err) {
      next(err);
    }
  },

  sendMatch(req, res, next) {
    try {
      const { customerId, candidateId } = req.params;
      const { subject, body, tone = 'warm_concierge', compatibilityScore, scoreBreakdown } = req.body;

      const customer = clientRepository.findById(customerId);
      const candidate = clientRepository.findById(candidateId);

      if (!customer || !candidate) {
        return res.status(404).json({
          success: false,
          message: 'Customer or candidate profile not found'
        });
      }

      const evaluation = matchingService.calculateCompatibility(customer, candidate);
      const score = compatibilityScore || evaluation.totalScore;
      const breakdown = scoreBreakdown || evaluation.breakdown;

      const assignmentId = `match_${crypto.randomUUID().slice(0, 8)}`;
      const pitchId = `pitch_${crypto.randomUUID().slice(0, 8)}`;

      // Upsert assignment record
      const assignment = matchRepository.upsertAssignment({
        id: assignmentId,
        clientId: customerId,
        candidateId,
        matchmakerId: req.user.id,
        compatibilityScore: score,
        scoreBreakdown: breakdown,
        aiSummary: evaluation.strengths[0] || 'Curated match',
        aiStrengths: evaluation.strengths,
        aiWatchouts: evaluation.watchouts,
        status: 'sent_to_client'
      });

      // Mark sent timestamp
      matchRepository.updateStatus(assignment.id, 'sent_to_client', true);

      // Save pitch if provided
      if (subject && body) {
        matchRepository.recordPitch({
          id: pitchId,
          assignmentId: assignment.id,
          clientId: customerId,
          candidateId,
          subject,
          body,
          tone,
          aiGenerated: 1
        });
      }

      // Log note on customer timeline
      const noteId = `note_m_${crypto.randomUUID().slice(0, 8)}`;
      noteRepository.create({
        id: noteId,
        clientId: customerId,
        matchmakerId: req.user.id,
        noteType: 'feedback',
        content: `Dispatched curated match profile of ${candidate.first_name} ${candidate.last_name} (${candidate.designation} at ${candidate.company}) to client via email.`
      });

      return res.status(200).json({
        success: true,
        message: 'Match successfully sent to client',
        data: {
          assignmentId: assignment.id,
          status: 'sent_to_client',
          candidate: {
            id: candidate.id,
            name: `${candidate.first_name} ${candidate.last_name}`,
            email: candidate.email
          }
        }
      });
    } catch (err) {
      next(err);
    }
  }
};
