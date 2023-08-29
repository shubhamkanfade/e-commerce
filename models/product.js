const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    is_deleted: { type: Boolean, default: false },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  var self = this;
  const count = await self.constructor.count();
  self.id = count + 1;
  next();
});

module.exports = mongoose.model("product", productSchema);
