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
    isPlaced: {
      type: Boolean,
      required: true,
      default: false,
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
