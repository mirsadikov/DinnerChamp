import jwt from 'jsonwebtoken';
import { Orderer } from '../config/sequelize.js';

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
    // send to phone number with twilio

    console.log(`CODE for ${phone}: `, code);

    return res.status(200).json();
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
