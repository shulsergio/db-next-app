import { model, Schema } from 'mongoose';


const CategorySchema = new Schema({
  category: {
    type: String,
    required: false
  },
  share: {
    type: Number,
    required: false
  }
}, { _id: false });

const IhsDataSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  week: {
    type: Number,
    required: true
  },
  categories: {
    type: [CategorySchema],
    required: true
  }
}, { _id: false });

const ihsSchema = new Schema(
    {
storeId:{
    type: String,

    required: true,
    unique: true
},    
ihs:{
    type:[IhsDataSchema],
    required: true
},
    },
    { timestamps: true, versionKey: false },
);


ihsSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const IhsCollection = model('ihsdata', ihsSchema);
