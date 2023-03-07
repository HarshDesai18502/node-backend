// const cart = [];

const Product = require('../models/product');
// const Cart = require("../models/cart");

const logger = require('../logger');

// To get Index Page
exports.getIndexPage = (req, res) => {
  res.render('shop/index', {
    title: 'Shop',
    isLoggedIn: req.session.isLoggedIn
  });
  // const checkLogin = req.get('cookie').split('=')[1];
};

// To get all the products
exports.getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        title: 'Products',
        isLoggedIn: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));

  logger.customerLogger.log('info', 'user successfully fetched products');
};

// To get a Single Product
exports.getProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/view-product', { prods: product });
    })
    .catch((err) => {
      console.log(err);
    });
};

// For cart
exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) =>
      cart
        .getProducts()
        .then((products) => {
          res.render('shop/cart', {
            cartItems: products,
            isLoggedIn: req.session.isLoggedIn
          });
        })
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
};

exports.postCart = async (req, res) => {
  const prodId = req.body.productId;
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;

      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      if (product) {
        res.redirect('/cart');
      } else {
        Product.findByPk(prodId)
          .then((productFound) =>
            fetchedCart.addProduct(productFound)
          )
          .catch((err) => console.log(err));
        res.redirect('/');
      }
    })
    .catch((err) => console.log(err));
};
