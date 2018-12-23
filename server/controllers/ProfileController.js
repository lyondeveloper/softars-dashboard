require("../config/config");
const Profile = require("../models/Profile");
const User = require("../models/User");
const validateProfileInput = require("../validation/InputValidation")
  .validateProfileInput;

class ProfileController {
  async createOrEdit(req, res) {
    try {
      //Checking for errors
      const { errors, isValid } = validateProfileInput(req.body);
      if (!isValid) return res.status(400).json(errors);

      //Creating the profileFields object and checking for the fields
      let profileFields = {};

      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.ocupation) profileFields.ocupation = req.body.ocupation;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.country) profileFields.country = req.body.country;

      //Checking if profession has an "," => if this true, then we will split the string into an array with the indexOf˚
      if (typeof req.body.profession !== "undefined") {
        profileFields.profession = req.body.profession.split(", ");
      }

      //Checking if the user has a profile, if true, then it will be modified, else it will be created
      const profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        const profileUpdated = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        res.json(profileUpdated);
      } else {
        const handle = await Profile.findOne({ handle: profileFields.handle });

        if (handle) {
          errors.handle = "This handle already exist";
          return res.status(400).json(errors);
        } else {
          const newProfile = await new Profile(profileFields).save();

          res.json(newProfile);
        }
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

module.exports = new ProfileController();
