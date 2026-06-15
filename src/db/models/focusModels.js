import { model, Schema } from 'mongoose';

const focusModelsSchema = new Schema(
  {
    year: { type: Number, required: true },
    month: { type: String, required: true },
    sku: { type: String, required: true },
    prd: { type: String, required: true },
    type: { type: String, required: true },
    rrp: { type: String, required: true },
    focus: { type: Number, required: true },
    topFocus: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const focusModelsCollection = model('focusmodels', focusModelsSchema);
