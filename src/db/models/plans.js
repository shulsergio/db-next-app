import { model, Schema } from 'mongoose';

const plansSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    totalSOplan: { type: Number, required: true },
    totalSOfact: { type: Number, required: true },
    focusSOplan: { type: Number, required: true },
    focusSOfact: { type: Number, required: true },
    topBonus: { type: Number, required: true },
    date: { type: Date, required: true },
    //682f8e184a19781cae4ce9e8 userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true, versionKey: false },
);

plansSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const PlansCollection = model('plans', plansSchema);
