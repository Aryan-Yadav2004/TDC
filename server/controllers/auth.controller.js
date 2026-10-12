import { authService } from '../services/auth.service.js';
import { matchmakerRepository } from '../repositories/matchmaker.repository.js';

export const authController = {
  login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = authService.login({ email, password });
      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: err.message
      });
    }
  },

  me(req, res, next) {
    try {
      const matchmaker = matchmakerRepository.findById(req.user.id);
      if (!matchmaker) {
        return res.status(404).json({
          success: false,
          message: 'Matchmaker profile not found'
        });
      }
      return res.status(200).json({
        success: true,
        data: matchmaker
      });
    } catch (err) {
      next(err);
    }
  },

  listMatchmakers(req, res, next) {
    try {
      const matchmakers = matchmakerRepository.getAll();
      return res.status(200).json({
        success: true,
        data: matchmakers
      });
    } catch (err) {
      next(err);
    }
  }
};
