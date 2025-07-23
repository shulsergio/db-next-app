import { model, Schema } from 'mongoose';

const newdataSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    data:{type:String, required: true},
    format:{type:String, required: true}
 },
  { timestamps: true, versionKey: false },
);

newdataSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const PlansCollection = model('newdata', newdataSchema);
