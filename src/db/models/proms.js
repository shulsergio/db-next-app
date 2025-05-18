import { model, Schema } from 'mongoose';

const promsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    promLG: { type: Number, required: true },
    promSEB: { type: Number, required: true },
    promPhilips: { type: Number, required: true },
    promBosch: { type: Number, required: true },
    promKarcher: { type: Number, required: true },
    promGorenjeHisens: { type: Number, required: true },
    promSony: { type: Number, required: true },
    promKivi: { type: Number, required: true },
    promTCL: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

promsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const PromsCollection = model('proms', promsSchema);
