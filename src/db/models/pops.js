import { model, Schema } from 'mongoose';

const popsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    dep: { type: String, enum: ['AV', 'DA'], default: 'DA' },
    group: {
      type: String,
      enum: ['WM', 'REF', 'VC', 'MWO', 'DW', 'Bin', 'TV', 'Monitors', 'Sound'],
      default: 'WM',
    },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const PopsCollection = model('pops', popsSchema);
