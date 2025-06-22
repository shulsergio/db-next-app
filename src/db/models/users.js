import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    mcsId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'promoter', 'merchendiser', 'trainer', 'user'],
      default: 'promoter',
    },
    userType: {
      type: String,
      enum: ['CE', 'AV', 'DA', 'MDA', 'SDA'],
      default: 'DA',
    },
    region: {
      type: String,
      enum: ['Dnipro', 'Kharkiv', 'Kyiv', 'Lviv', 'Odesa'],
      default: 'Kharkiv',
    },
    gender: { type: String, enum: ['man', 'woman'], default: 'man' },
    uniform: { type: String },
    shop: { type: String, required: true },
    lastVisit: { type: Date, default: Date.now },
    // userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
