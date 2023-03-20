import { Sequelize, DataTypes } from 'sequelize';
import RestaurantModel from '../models/Restaurant.js';
import DishModel from '../models/Dish.js';
import CategoryModel from '../models/Category.js';
import OrderModel from '../models/Order.js';
import OrderDishModel from '../models/OrderDish.js';
import OrdererModel from '../models/Orderer.js';
import EmployeeModel from '../models/Employee.js';

const dbConfig = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: '123456',
  DB: 'dinnerchamp',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  logging: process.env.NODE_ENV === 'production' ? false : (str) => console.log(str.brightGreen),
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// (async () => await db.sync({ alter: true }))();
const Restaurant = RestaurantModel(db, DataTypes);
const Dish = DishModel(db, DataTypes);
const Category = CategoryModel(db, DataTypes);
const Order = OrderModel(db, DataTypes);
const OrderDish = OrderDishModel(db, DataTypes);
const Orderer = OrdererModel(db, DataTypes);
const Employee = EmployeeModel(db, DataTypes);

Restaurant.hasMany(Dish, {
  foreignKey: 'restaurantId',
  as: 'dishes',
});

Dish.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  as: 'restaurant',
});

Category.hasMany(Dish, {
  foreignKey: 'categoryId',
  as: 'dishes',
});

Dish.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

Restaurant.hasMany(Category, {
  foreignKey: 'restaurantId',
  as: 'categories',
});

Category.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  as: 'restaurant',
});

Restaurant.hasMany(Order, {
  foreignKey: 'restaurantId',
  as: 'orders',
});

Order.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  as: 'restaurant',
});

Order.hasMany(OrderDish, {
  foreignKey: 'orderId',
  as: 'orderDishes',
});

OrderDish.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

Dish.hasMany(OrderDish, {
  foreignKey: 'dishId',
  as: 'orderDishes',
});

OrderDish.belongsTo(Dish, {
  foreignKey: 'dishId',
  as: 'dish',
});

Orderer.hasMany(Order, {
  foreignKey: 'ordererPhone',
  as: 'orders',
});

Order.belongsTo(Orderer, {
  foreignKey: 'ordererPhone',
  as: 'orderer',
});

Restaurant.hasMany(Employee, {
  foreignKey: 'restaurantId',
  as: 'employees',
});

Employee.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  as: 'restaurant',
});

export default db;
export { Restaurant, Dish, Category, Order, OrderDish, Orderer, Employee };
