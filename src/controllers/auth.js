import { REFRESH_TOKEN } from '../constants';
import { UsersCollection } from '../db/models/users';
import { loginUser, registerUser } from '../services/auth';

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
