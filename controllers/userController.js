const { users: User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (userInput) => {
  const password = await bcrypt.hash(userInput.trim(), 10);
  return password;
};
exports.currentUser = async (req, res, next) => {
  try {
    res.status(201).send({ success: true, user: req.user });
  } catch (error) {
    console.log(error.message);
    // console.log(errors.ValidationErrorItem.validatorKey);
    // console.log(error.errors[0].validatorKey);
    next(error);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    //hash password func
    // const password = await bcrypt.hash(req.body.password.trim(), 10);
    const password = await hashPassword(req.body.password);

    const user = await User.create({ ...req.body, password });

    res.status(201).send({ success: true, user });
  } catch (error) {
    if (error.errors[0].validatorKey === 'not_unique') {
      return res.status(400).send('user name alredy exits');
    }
    // console.log(errors.ValidationErrorItem.validatorKey);
    // console.log(error.errors[0].validatorKey);
    next(error);
  }
};

//GET USERS

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
    next(error);
  }
};

// LOGIN USER
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User nor found' });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).send('password issue...');
    }
    const token = await jwt.sign({ user_id: user.user_id }, 'secret', {
      expiresIn: '1h',
    });
    res.status(200).send({ success: true, user, token });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  const newData = {};
  try {
    const { name, password } = req.body;
    if (password) newData.password = await hashPassword(req.body.password);
    if (name) newData.name = name;
    await User.update(
      { password: newData.password, name: newData.name },
      {
        where: { user_id: req.user.user_id },
      }
    );
    const user = await User.findOne({ where: { user_id: req.user.user_id } });
    res.status(200).send({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// DELETE USER

exports.deleteUser = async (req, res, next) => {
  try {
    await User.destroy({ where: { user_id: req.user.user_id } });
    res.status(200).send({ success: true, message: 'User deteled...' });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
