import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/users.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, REFRESH_TOKEN } from '../constants/index.js';

//----- registerUser
// export const registerUser = async (payload) => {
//   const user = await UsersCollection.findOne({
//     email: payload.email,
//   });
//   if (user) throw createHttpError(409, 'Email in use');
//   const encryptedPassword = await bcrypt.hash(payload.password, 10);

//   return await UsersCollection.create({
//     ...payload,
//     password: encryptedPassword,
//   });
// };
export const registerUser = async (payload) => {
  console.log('registerUser: Start');
  console.log(
    'registerUser: Searching for existing user with email:',
    payload.email,
  );
  const user = await UsersCollection.findOne({
    email: payload.email,
  });
  console.log('registerUser: findOne result:', user ? 'found' : 'not found');

  if (user) {
    console.log(
      'registerUser: Email already in use, throwing 409 ConflictError',
    );
    throw createHttpError(409, 'Email in use');
  }

  console.log('registerUser: Hashing password...');
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  console.log('registerUser: Password hashed.');

  console.log('registerUser: Creating new user in DB...');
  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
  console.log('registerUser: User successfully created in DB:', newUser._id);

  return newUser;
};

//----- loginUser
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({
    email: payload.email,
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
