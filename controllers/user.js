const db = require('../models');
const User = db.user;
const passwordUtil = require('../utils/passwordComplexityCheck');

module.exports.create = (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Can not be empty!' });
      return;
    }
    const passwordch = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(passwordch);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const user = new User(req.body);
    user
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while creating the user.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};

module.exports.getAll = (req, res, next) => {
  try {
    User.find({})
      .then((data) => {
        if (data[0] == null) res.status(404).send({ message: 'Not found or Empty.'});
        else res.status(200).send(data);
        // res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};

module.exports.getUser = (req, res, next) => {
  try {
    const username = req.params.username;
    User.find({ username: username })
      .then((data) => {
        if (data[0] == null) res.status(404).send({ message: 'Not found.'});
        else res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error occurred while retrieving.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    User.findOne({ username: username }, function (err, user) {
      user.username = req.params.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.info = req.body.info;
      user.profile = req.body.profile;
      user.save(function (err) {
        if (err) {
          res.status(500).json(err || 'Error occurred while updating.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    User.deleteOne({ username: username }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Error occurred while deleting.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Error occurred while deleting.');
    next(err);
  }
};
