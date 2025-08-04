const expressAsyncHandler = require("express-async-handler");
const CartService = require("../services/cart.services");

exports.addToCart = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  // console.log(req.user, req.body);
  const cart = await CartService.addItem(userId, req.body);
  res.status(200).json({ cart });
});

exports.getCart = expressAsyncHandler(async (req, res) => {
  const cart = await CartService.getCart(req.user._id);
  // console.log(cart);
  res.status(200).json({ cart });
});

exports.removeFromCart = expressAsyncHandler(async (req, res) => {
  const { productId, variant } = req.body;
  const cart = await CartService.removeItem(req.user._id, productId, variant);
  res.status(200).json({ cart });
});

exports.clearCart = expressAsyncHandler(async (req, res) => {
  const cart = await CartService.clearCart(req.user._id);
  res.status(200).json({ cart });
});
