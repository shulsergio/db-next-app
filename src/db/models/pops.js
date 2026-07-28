import { model, Schema } from 'mongoose';

const popsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const PopsCollection = model('pops', popsSchema);
