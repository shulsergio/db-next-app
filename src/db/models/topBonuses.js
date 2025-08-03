import { model, Schema } from 'mongoose';

const CategorySchema = new Schema({
    account: { type: String, required: true },
    item: { type: String, required: true },
    soqty: { type: Number, required: true },
    bonus: { type: Number, required: true },
    prd: { type: String, required: true },
    day: { type: String, required: true },
    week: { type: String, required: true },
}, { _id: false });

const BonusDataItemSchema = new Schema({
    categories: { type: [CategorySchema], required: true },

}, { _id: false });

const TopBonusesSchema = new Schema({
    bonusData: { type: [BonusDataItemSchema], required: true },
        storeId: { type: String, required: true }
});

export const topBonusesCollection = model('topBonusesDatas', TopBonusesSchema);