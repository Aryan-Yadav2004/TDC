import crypto from 'crypto';
import { clientRepository } from '../repositories/client.repository.js';
import { noteRepository } from '../repositories/note.repository.js';
import { matchRepository } from '../repositories/match.repository.js';

export const clientController = {
  list(req, res, next) {
    try {
      const {
        matchmakerId,
        gender,
        journeyStage,
        city,
        search,
        page = 1,
        limit = 50
      } = req.query;

      const result = clientRepository.findAll({
        matchmakerId: matchmakerId === 'all' ? null : (matchmakerId || null),
        gender: gender || null,
        journeyStage: journeyStage || null,
        city: city || null,
        search: search || null,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
      });

      return res.status(200).json({
        success: true,
        data: result.clients,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages
        }
      });
    } catch (err) {
      next(err);
    }
  },

  getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const client = clientRepository.findById(id);

      if (!client) {
        return res.status(404).json({
          success: false,
          message: 'Client not found'
        });
      }

      const notes = noteRepository.findByClientId(id);
      const matches = matchRepository.findByClient(id);

      return res.status(200).json({
        success: true,
        data: {
          ...client,
          notes,
          matches
        }
      });
    } catch (err) {
      next(err);
    }
  },

  updateJourneyStage(req, res, next) {
    try {
      const { id } = req.params;
      const { journeyStage } = req.body;

      if (!journeyStage) {
        return res.status(400).json({
          success: false,
          message: 'journeyStage is required'
        });
      }

      const success = clientRepository.updateJourneyStage(id, journeyStage);
      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Client not found'
        });
      }

      // Automatically add a system note recording the stage transition
      const noteId = `note_sys_${crypto.randomUUID().slice(0, 8)}`;
      noteRepository.create({
        id: noteId,
        clientId: id,
        matchmakerId: req.user.id,
        noteType: 'internal',
        content: `Stage updated to "${journeyStage.replace('_', ' ').toUpperCase()}" by ${req.user.name}.`
      });

      return res.status(200).json({
        success: true,
        message: 'Journey stage updated successfully',
        data: { journeyStage }
      });
    } catch (err) {
      next(err);
    }
  },

  addNote(req, res, next) {
    try {
      const { id } = req.params;
      const { noteType = 'call_summary', content } = req.body;

      if (!content || !content.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Note content cannot be empty'
        });
      }

      const noteId = `note_${crypto.randomUUID().slice(0, 8)}`;
      const note = noteRepository.create({
        id: noteId,
        clientId: id,
        matchmakerId: req.user.id,
        noteType,
        content: content.trim()
      });

      return res.status(201).json({
        success: true,
        message: 'Note added successfully',
        data: note
      });
    } catch (err) {
      next(err);
    }
  },

  deleteNote(req, res, next) {
    try {
      const { noteId } = req.params;
      const success = noteRepository.delete(noteId);

      if (!success) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Note deleted successfully'
      });
    } catch (err) {
      next(err);
    }
  }
};
