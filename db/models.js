const sequelize = require('./db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    Phone_number: { type: DataTypes.STRING, unique: true },
    Name: { type: DataTypes.STRING },
});
exports.User = User;

const Product = sequelize.define('product', {
    id_product: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    product_description: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.STRING },
    availability: { type: DataTypes.INTEGER },
});
exports.Product = Product;

const Purchase = sequelize.define('purchase', {
    id_purchase: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
    quantity: { type: DataTypes.INTEGER },
});
exports.Purchase = Purchase;

User.hasOne(Purchase)
Purchase.belongsTo(User, { foreignKey: 'user_id' })

Purchase.hasMany(Product);
Purchase.belongsTo(Product, { foreignKey: 'id_product' })

module.exports = { User, Product, Purchase }

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    customerName: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Order;