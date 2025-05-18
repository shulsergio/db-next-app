import { REFRESH_TOKEN } from '../constants/index.js';
import { UsersCollection } from '../db/models/users.js';
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshUserSession,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'User create!',
    data: user,
  });
};
//loginUser
export const loginUserController = async (req, res) => {
  const user = await UsersCollection.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN),
  });
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: {
        name: user.name, // Имя пользователя
        email: user.email, // Email пользователя
      },
      accessToken: session.accessToken,
    },
  });
};
//logoutUser
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

//setupSession
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
