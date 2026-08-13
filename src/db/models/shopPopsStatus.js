import { model, Schema } from 'mongoose';

const shopPopsStatusesSchema = new Schema(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'shops',
      required: true,
    },
    popId: {
      type: Schema.Types.ObjectId,
      ref: 'pops',
      required: true,
    },
    qtyPlaced: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    qtyTotal: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

shopPopsStatusesSchema.index({ shopId: 1, popId: 1 }, { unique: true });

export const ShopPopStatusesCollection = model(
  'shopPopStatuses',
  shopPopsStatusesSchema,
);
