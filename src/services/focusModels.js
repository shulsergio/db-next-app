// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (type, limit, page) => {
  const skipModels = (page - 1) * limit;
  console.log('**???*** CONSOLE getFocusModels - limit:', limit);
  console.log('**???*** CONSOLE getFocusModels - page:', page);
  console.log('**???*** CONSOLE getFocusModels - skipModels:', skipModels);
  return await focusModelsCollection
    .find({ type })
    .skip(skipModels)
    .limit(limit)
    .exec();
  // return await focusModelsCollection.find({ type });
};

// const limit = 20;
// const page = 1;
// const skipModels = (page - 1) * limit;
// console.log('**???*** CONSOLE getFocusModels - limit:', limit);
// console.log('**???*** CONSOLE getFocusModels - page:', page);
// console.log('**???*** CONSOLE getFocusModels - skipModels:', skipModels);
// return await focusModelsCollection
//   .find({ type })
//   .skip(skipModels)
//   .limit(limit)
//   .exec();
