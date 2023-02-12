import mongoose from "mongoose";

export function convertObjectIdToString(objectId) {
  return mongoose.mongo.ObjectId(objectId).toString();
}
