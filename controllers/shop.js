// const cart = [];

const Product = require("../models/product");
const Cart = require("../models/cart");

const logger = require("../logger");

//To get Index Page
exports.getIndexPage = (req, res, next) => {
  res.render("shop/index", {
    title: "Shop",
    isLoggedIn: req.session.isLoggedIn,
  });
  // const checkLogin = req.get('cookie').split('=')[1];
};

//To get all the products
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        title: "Products",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));

  logger.customerLogger.log("info", "user successfully fetched products");
};

//To get Single Product
exports.getProduct = (req, res, next) => {
  let prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/view-product", { prods: product });
    })
    .catch((err) => {
      console.log(err);
    });
};

//For cart
exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    return cart.getProducts().then((products) => {
      res.render("shop/cart", {
        cartItems: products,
        isLoggedIn: req.session.isLoggedIn,
      });
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  let products = await Product.fetchAll().then(([rows, data]) => {
    return rows;
  });
  console.log(products);
  let product = products.find((product) => product.id == prodId);
  console.log(product);

  const cartItems = Cart.fetchAll();

  const found = cartItems.some((product) => product.id == prodId);
  console.log(found);
  if (!found) {
    Cart.save(product);
  }

  res.redirect("/cart");
};
