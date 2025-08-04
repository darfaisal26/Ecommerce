const Cart = require("../models/cart.model");

exports.addItem = async (userId, { product, variant, quantity }) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product, variant, quantity }],
    });
    return cart;
  }

  const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === product &&
      item.variant.color === variant.color &&
      item.variant.size === variant.size
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product, variant, quantity });
  }

  await cart.save();
  return cart;
};

exports.getCart = async (userId) => {
  return await Cart.findOne({ user: userId })
    .populate("user", "-password")
    .populate("items.product");
};

exports.removeItem = async (userId, productId, variant) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  cart.items = cart.items.filter(
    (item) =>
      !(
        item.product.toString() === productId &&
        item.variant.color === variant.color &&
        item.variant.size === variant.size
      )
  );

  await cart.save();
  return cart;
};

exports.clearCart = async (userId) => {
  return await Cart.findOneAndUpdate(
    { user: userId },
    { $set: { items: [] } },
    { new: true }
  );
};
