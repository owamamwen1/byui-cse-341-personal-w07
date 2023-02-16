const db = require('../models');
const Faculty = db.faculty;

exports.getFaculty = (req, res) => {
  const facultyName = req.params.facultyName;
  Faculty.find({ facultyName: facultyName })
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Not found: ' + facultyName });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error with facultyName=' + facultyName,
        error: err
      });
    });
};
