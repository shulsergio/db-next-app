import { model, Schema } from 'mongoose';

const shopsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },

    //682f8e184a19781cae4ce9e8 userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ShopsCollection = model('shops', shopsSchema);
