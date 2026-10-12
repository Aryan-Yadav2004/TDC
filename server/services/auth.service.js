import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { matchmakerRepository } from '../repositories/matchmaker.repository.js';

export const authService = {
  login({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const matchmaker = matchmakerRepository.findByEmail(email.trim());
    if (!matchmaker) {
      throw new Error('Invalid credentials');
    }

    if (!matchmaker.active) {
      throw new Error('Account has been deactivated');
    }

    const isMatch = bcrypt.compareSync(password, matchmaker.password_hash);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      id: matchmaker.id,
      name: matchmaker.name,
      email: matchmaker.email,
      role: matchmaker.role
    };

    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN
    });

    return {
      token,
      matchmaker: {
        id: matchmaker.id,
        name: matchmaker.name,
        email: matchmaker.email,
        role: matchmaker.role,
        avatar_url: matchmaker.avatar_url,
        bio: matchmaker.bio
      }
    };
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch {
      return null;
    }
  }
};
