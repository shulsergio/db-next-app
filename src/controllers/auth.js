import { REFRESH_TOKEN } from '../constants/index.js';
import { UsersCollection } from '../db/models/users.js';
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshUserSession,
} from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  console.log('registerUserController: Start');
  try {
    const user = await registerUser(req.body);
    // console.log('registerUserController: User created:', user._id);
    // console.log('reeeeeeeeeggggg USER', user);
    res.status(201).json({
      status: 201,
      message: 'User created!',
      data: user,
    });
  } catch (error) {
    console.error('Error in registerUserController:', error);
    next(error);
  }
};

//loginUser
export const loginUserController = async (req, res) => {
  const user = await UsersCollection.findOne({ mcsId: req.body.mcsId });
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

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    user._id,
    { lastVisit: new Date() },
    { new: true },
  );
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        mcsId: updatedUser.mcsId,
        role: updatedUser.role,
        userType: updatedUser.userType,
        region: updatedUser.region,
        gender: updatedUser.gender,
        uniform: updatedUser.uniform,
        shop: updatedUser.shop,
        lastVisit: updatedUser.lastVisit,
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
