const Product = require('../models/product');

// For Add-Product Page
exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', { isLoggedIn: req.session.isLoggedIn });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.productName;
  const { imageUrl, price, description } = req.body;

  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description
    })
    .then(res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};


// For getting all the products on Admin-side
exports.getAdminProducts = (req, res) => {
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

// To get update product page
exports.getUpdateMenu = (req, res) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render('admin/edit-product', { prods: product });
    })
    .catch((err) => console.log(err));
};


// To update Product
exports.updateProduct = async (req, res) => {
  const prodId = req.body.productId;

  const updatedTitle = req.body.productName;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      const a = product;

      a.title = updatedTitle;
      a.imageUrl = updatedImageUrl;
      a.price = updatedPrice;
      a.description = updatedDescription;

      return product.save();
    })
    .then(() => {
      res.redirect(`/products/${prodId}`);
    })
    .catch((err) => console.log(err));
};


// To delete a Product
exports.deleteProduct = (req, res) => {

  const prodId = req.body.productId;
  Product.destroy({
    where: {
      id: prodId
    }
  });

  res.redirect('/admin/products');
};
