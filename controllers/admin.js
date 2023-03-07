const Product = require('../models/product');
const Cart = require('../models/cart');

const ApiError = require('../error/ApiError');

//For Add-Product Page
const getAddProduct = (req, res, next) => {
  res.render('admin/add-product', { isLoggedIn: req.session.isLoggedIn });
};

exports.postAddProduct = (req, res, next) => {
  // title = req.body.productName;
  // imageUrl = req.body.imageUrl;
  // price = req.body.price;
  // description = req.body.description;
  const { title, imageUrl, price, description } = req.body;

  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

//For getting all the products on Admin-side
exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        title: 'Admin Products',
        isLoggedIn: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

//To Update the product
exports.updateProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render('admin/edit-product', { prods: product });
    })
    .catch((err) => console.log(err));
};

exports.finishUpdate = async (req, res, next) => {
  let prodId = req.body.productId;

  const updatedTitle = req.body.productName;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  console.log(updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;

      return product.save();
    })
    .then((result) => {
      res.redirect(`/products/${prodId}`);
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  // let products = Product.fetchAll();
  let prodId = req.body.productId;

  // let index = products.findIndex((product) => product.id == prodId);
  // Product.delete(index);

  // let cartItems = Cart.fetchAll();
  // index = cartItems.findIndex((product) => product.id == prodId);
  // Cart.delete(index);

  Product.destroy({
    where: {
      id: prodId
    }
  });

  res.redirect('/admin/products');
};
