import { model, Schema } from 'mongoose';

/*
mcsId
"C070133812"

data
Array (31)

0
Object
Account
"COMFY"
Item
"NK24M1030IB/UR"
Qty
1
bonus
100
PRD
"MDA"
Day
"06/30"
Week
"w27"
*/


const topBonusesSchema = new Schema({
    mcsId: {
        type: String,
        required: true,
        unique: true
    },
    data: [
        {
            Account: {
                type: String,
                required: true
            },
            Item: {
                type: String,
                required: true
            },
            Qty: {
                type: Number,
                required: true
            },
            bonus: {
                type: Number,
                required: true
            },
            PRD: {
                type: String,
                required: true
            },
            Day: {
                type: String,
                required: true
            },
            Week: {
                type: String,
                required: true
            }
        }
    ]
},
  { timestamps: true, versionKey: false },
);

topBonusesSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const topBonusesCollection = model('topBonusesDatas', topBonusesSchema);