import { model, Schema } from 'mongoose';

const weeklyPromsPlansSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    totalSOplanW1: { type: Number, required: true },
    totalSOplanW2: { type: Number, required: true },
    totalSOplanW3: { type: Number, required: true },
    totalSOplanW4: { type: Number, required: true },
    totalSOplanW5: { type: Number, required: false },
    focusSOplanW1: { type: Number, required: true },
    focusSOplanW2: { type: Number, required: true },
    focusSOplanW3: { type: Number, required: true },
    focusSOplanW4: { type: Number, required: true },
    focusSOplanW5: { type: Number, required: false },

    date: { type: Date, required: true },
    //682f8e184a19781cae4ce9e8 userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true, versionKey: false },
);

weeklyPromsPlansSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const WeeklyPromsPlansCollection = model(
  'weeklyPromsPlans',
  weeklyPromsPlansSchema,
);
