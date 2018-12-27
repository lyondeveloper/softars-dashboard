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
      const profileFields = {};

      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.occupation) profileFields.occupation = req.body.occupation;
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

        res.json({
          updated: true,
          profileUpdated
        });
      } else {
        const handle = await Profile.findOne({ handle: profileFields.handle });

        if (handle) {
          errors.handle = "This handle already exist";
          return res.status(400).json(errors);
        } else {
          const newProfile = await new Profile(profileFields).save();

          res.json({
            new: true,
            newProfile
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAll(req, res) {
    try {
      const errors = {};

      //Getting all profiles by date and populating the users name
      const profiles = await Profile.find()
        .sort({ date: "descending" })
        .populate("user", ["name"]);

      //If there is error, return 404 status
      if (!profiles) {
        errors.noProfiles = "No profiles available";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    } catch (err) {
      console.log(err);
    }
  }

  async getByHandle(req, res) {
    try {
      const errors = {};

      //Grabbing the handle from the params
      const { handle } = req.params;

      const profileByHandle = await Profile.findOne({ handle });

      //Checking if handle is invalid, if true then return 404 status with the errors object
      if (!profileByHandle) {
        errors.notFound = "This profile doesn't exist";
        return res.status(404).json(errors);
      }

      res.json(profileByHandle);
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    try {
      //Deleting profile and user from database

      const profileDeleted = await Profile.findOneAndRemove({
        user: req.user.id
      });

      if (profileDeleted) {
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ success: true });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new ProfileController();
