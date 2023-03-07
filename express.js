const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');

// const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// const expressHbs = require('express-handlebars');

const session = require('express-session');

const adminRoutes = require('./Routes/admin');
const shopRoutes = require('./Routes/shop');
const authRoutes = require('./Routes/auth');

const errorController = require('./controllers/error');

// const exp = require('constants');

// const apiErrorHandler = require('./error/errorHandler');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

// app.use(helmet());
app.use(morgan('tiny'));

const corsOptions = {
  origin: ['https://example.com', 'https://example2.com'],
  OptionSuccessStatus: 200
};

app.use(cors(corsOptions));

// app.engine('handlebars',expressHbs());
// app.set('view engine','handlebars');
app.set('view engine', 'ejs');

// app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.pageNotFound);

// sequelize.sync().then(user => console.log(user)).catch(err => console.log(err));

// app.listen(3000);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// // app.use(apiErrorHandler);

sequelize
  .sync()
  .then(() => User.findByPk(1))
  .then((user) => {
    if (!user) {
      User.create({ userName: 'Harsh', email: 'harsh123@gmail.com' });
    }
    return user;
  })
  .then((user) => user.createCart())
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
