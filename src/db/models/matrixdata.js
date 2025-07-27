import { model, Schema } from 'mongoose';


const categorySchema= new Schema({
  BZType: {
    type: String,
    required: false
  },
    GroupType: {
    type: String,
    required: false
  },
  ProductGrp: {
    type: String,
    required: false
  },
  MainSKU: {
    type: String,
    required: false
  },
  Replacement: {
    type: String,
    required: false
  },
});

const matrixDataSchema = new Schema(
    {
  region: {
    type: String,
    required: false
  },
  account: {
    type: Number,
    required: false
  }
  ,
  categories: {
    type:[categorySchema],
    required: true
  }
}, { _id: false });

const matrixSchema = new Schema(
    {
storeId:{
    type: String,
    required: true,
    unique: true
},    
matrixData:{
    type:[matrixDataSchema],
    required: true
},
    },
    { timestamps: true, versionKey: false },
);

matrixSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const MatrixCollection = model('matrixDatas', matrixSchema);
