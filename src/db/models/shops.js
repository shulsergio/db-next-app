import { model, Schema } from 'mongoose';

const shopsSchema = new Schema(
  {
    storeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    chain: { type: String, required: true },
    address: { type: String, required: true },

    region: {
      type: String,
      enum: ['Dnipro', 'Kharkiv', 'Kyiv', 'Lviv', 'Odesa'],
      default: 'Kharkiv',
    },
    city: {
      type: String,
      default: 'Kharkiv',
    },

    merchandiserId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ShopsCollection = model('shops', shopsSchema);
