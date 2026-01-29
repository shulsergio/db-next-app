import { model, Schema } from 'mongoose';

const IhsDataSchema = new Schema(
  {
    storeId: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    week: {
      type: String,
      required: false,
    },
    share: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
  },
  { _id: false },
);

export const IhsCollection = model('ihsdatas', IhsDataSchema);
