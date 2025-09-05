import { model, Schema } from 'mongoose';

const davMotivationSchema = new Schema({
  cluster: { type: Number, required: true },
  storeId: { type: String, required: true },
  mcsId: { type: String, required: true },
  soar: { type: Number, required: true },
  soqty: { type: Number, required: true },
  ttlar: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const davMotivationCollection = model(
  'davmotivation',
  davMotivationSchema,
);
