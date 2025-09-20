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
    // dep: { type: String, required: true },
    data: [focusModelsDataSchema],
    //682f8e184a19781cae4ce9e8 userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true, versionKey: false },
);

export const focusModelsCollection = model('focusmodels', focusModelsSchema);
