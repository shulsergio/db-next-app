import { model, Schema } from 'mongoose';

const AVdavMotivationSchema = new Schema({
  cluster: { type: Number, required: true },
  region: { type: String, required: true },
  storeId: { type: String, required: true },
  mcsId: { type: String, required: true },
  soar: { type: String, required: true },
  soqty: { type: String, required: true },
  ttlar: { type: String, required: true },
  rank: { type: Number, required: true },
});

export const AVdavMotivationCollection = model(
  'davmotivations',
  AVdavMotivationSchema,
);
