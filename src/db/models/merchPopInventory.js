import { model, Schema } from 'mongoose';

const merchPopInventorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    popId: {
      type: Schema.Types.ObjectId,
      ref: 'pops',
      required: true,
    },
    qtyStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

merchPopInventorySchema.index({ userId: 1, popId: 1 }, { unique: true });

export const MerchPopInventoryCollection = model(
  'merchpopinventories',
  merchPopInventorySchema,
);
