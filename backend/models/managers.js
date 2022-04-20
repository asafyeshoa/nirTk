const mongoose = require("mongoose");
const collectionName = "managers";
const schemaName = "managers";
const SchemaTypes = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    name: { type: String, required: true, trim: true },
    employed: [{ type: SchemaTypes.ObjectId, ref: "users" }],
  },
  { strict: false, autoCreate: true, timestamps: true }
);

const model = mongoose.model(schemaName, schema, collectionName);

module.exports = model;
module.exports.schema = schema;
