module.exports = (mongoose) => {
  const Faculty = mongoose.model(
    'faculties',
    mongoose.Schema({
      facultyName: {
        type: String
      },
      role: {
        type: String
      },
      branch: {
        type: String
      },
      website: {
        type: String
      },
      courses: {
        type: [String]
      }
    })
  );

  return Faculty;
};
