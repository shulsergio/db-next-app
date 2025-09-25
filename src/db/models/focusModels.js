import { model, Schema } from 'mongoose';

const focusModelsDataSchema = new Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  sku: { type: String, required: true },
  prd: { type: String, required: true },
  type: { type: String, required: true },
  rrp: { type: String, required: true },
  focus: { type: Number, required: true },
  topFocus: { type: Number, required: true },
});

const focusModelsSchema = new Schema(
  {
    data: [focusModelsDataSchema],
  },
  { timestamps: true, versionKey: false },
);

export const focusModelsCollection = model('focusmodels', focusModelsSchema);
