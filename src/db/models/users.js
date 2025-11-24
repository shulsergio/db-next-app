import { model, Schema } from 'mongoose';
export const publicFields =
  'name mcsId email role userType region city gender uniform dateOfBirth shop DateOfHired DateOfFired lastVisit createdAt updatedAt';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    mcsId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        'admin',
        'rffm',
        'rmUser',
        'promoter',
        'merchendiser',
        'trainer',
        'guest',
      ],
      default: 'promoter',
    },
    userType: {
      type: String,
      enum: ['AV', 'DA', 'MDA', 'SDA', 'CE'],
      default: 'DA',
    },
    region: {
      type: String,
      enum: ['Dnipro', 'Kharkiv', 'Kyiv', 'Lviv', 'Odesa'],
    },
    city: { type: String, default: '' },
    mobile: { type: String, default: '' },
    INN: { type: String, default: '' },
    gender: { type: String, enum: ['man', 'woman'], default: 'man' },
    dateOfBirth: { type: Date },
    uniform: { type: String },
    activeUser: { type: Boolean, default: true },
    shop: { type: String, required: true },
    DateOfHired: { type: Date, default: null },
    DateOfFired: { type: Date, default: null },
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
