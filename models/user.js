module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
    username: {
      type: String
    },
    password: {
      type: String
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    country: {
      type: String
    },
    city: {
      type: String
    },
    isPublic: {
      type: Boolean
    },
    faculty_name: {
      type: String
    },
    info: {
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      email: {
        type: String
      },
      phoneNumber: {
        type: String
      },
      country: {
        type: String
      },
      city: {
        type: String
      },
      isPublic: {
        type: Boolean
      },
      faculty_name: {
        type: String
      }
    },
    profile: {
      student: {
        type: [mongoose.SchemaTypes.Mixed]
      },
      group: {
        type: [mongoose.SchemaTypes.Mixed]
      },
      announcements: {
        type: [mongoose.SchemaTypes.Mixed]
      }
    }
  });

  return mongoose.model('users', userSchema);
};
