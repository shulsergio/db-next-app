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

    //682f8e184a19781cae4ce9e8 userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ShopsCollection = model('shops', shopsSchema);
