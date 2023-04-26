import jwt from 'jsonwebtoken';
import twillio from 'twilio';
import { Orderer, Order, Restaurant, OrderDish, Dish } from '../config/sequelize.js';

export const sendCode = async (req, res, next) => {
  try {
    // generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000);

    const { phone } = req.body;

    // if missing required fields
    if (!phone) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const newPhone = phone.replace(/\D/g, '');

    // validate phone number
    if (!newPhone.match(/^998\d{9}$/)) {
      return res.status(400).json({
        message: 'Invalid phone number',
      });
    }

    Orderer.upsert({
      phone: newPhone,
      code,
    });

    // TODO
    // send to phone number with twillio
    const accountSid = process.env.TWILLO_SID;
    const authToken = process.env.TWILLO_TOKEN;
    const phoneFrom = process.env.TWILLO_PHONE_NUMBER;
    const client = twillio(accountSid, authToken);

    client.messages
      .create({
        body: `Your code for DinnerChamp is: ${code}`,
        from: phoneFrom,
        to: `+${newPhone}`,
      })
      .then(() => {
        console.log(`CODE for ${phone}: `, code);
        res.status(200).json();
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ message: 'Error sending code' });
      });
  } catch (error) {
    next(error);
  }
};

export const verifyCode = async (req, res, next) => {
  try {
    const { phone, code } = req.body;

    // if missing required fields
    if (!phone || !code) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const newPhone = phone.replace(/\D/g, '');

    const orderer = await Orderer.findOne({
      where: {
        phone: newPhone,
        code,
      },
    });

    if (!orderer) {
      return res.status(400).json({
        message: 'Incorrect code',
      });
    }

    // token
    const token = jwt.sign({ id: orderer.id, phone: newPhone }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.status(200).json({ token, number: newPhone });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { number } = req.orderer;

    const ordererFromDB = await Orderer.findOne({
      where: {
        phone: number,
      },
      // include orders that include restaurant
      include: [
        {
          model: Order,
          as: 'orders',
          include: [
            {
              model: Restaurant,
              as: 'restaurant',
              attributes: ['name', 'img'],
            },
            {
              model: OrderDish,
              as: 'orderDishes',
              attributes: ['quantity', 'id'],
              include: [
                {
                  model: Dish,
                  as: 'dish',
                  attributes: ['image', 'name'],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).json(ordererFromDB.orders);
  } catch (error) {
    next(error);
  }
};
