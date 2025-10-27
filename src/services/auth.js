import createHttpError from 'http-errors';
import { publicFields, UsersCollection } from '../db/models/users.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, REFRESH_TOKEN } from '../constants/index.js';

//----- registerUser
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({
    mcsId: payload.mcsId,
  });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

//----- loginUser
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({
    mcsId: payload.mcsId,
  });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN),
  });
};
// logoutUser

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

//----- createSession
export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN),
  };
};
//refreshUserSession

export const refreshUserSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Unauthorized');
  }
  const isSessionTokenExpired =
    session.refreshTokenValidUntil < new Date(Date.now());
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Unauthorized');
  }
  const newSession = createSession();
  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });
  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

//----- updateUniform
export const updateUniform = async (userId, newUniformValue) => {
  const user = await UsersCollection.findByIdAndUpdate(
    userId,
    { uniform: newUniformValue },
    { new: true },
  );
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const patchPassword = async (user, body) => {
  const { outDatePassword, newPassword } = body;
  const userId = user._id || user.id;

  if (!outDatePassword || !newPassword) {
    throw createHttpError(400, 'Current and new passwords are required.');
  }

  const passwordCompare = await bcrypt.compare(outDatePassword, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Invalid current password');
  }

  if (passwordCompare) {
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await UsersCollection.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true, select: publicFields },
    );

    if (!updatedUser) {
      throw createHttpError(404, 'User not found.');
    }

    return updatedUser;
  }
};
