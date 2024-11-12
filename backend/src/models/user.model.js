import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false
        },

        password: {
            type: String,
            required: false,
        },

        name: {
            type: String,
            required: false
        },

        surname:{
            type: String,
            required: false
        },

        email:{
            type: String,
            required: false,
            unique: false,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
        },

        passwordHash: {
            type: String,
            required: true,
        },

        bDate:{
            type: Date,
            required: false
        },

        pNumber:{
            type: String,
            required: false,
            match: [/^\d+$/, 'Phone number should contain only digits.'],
        }
    }

);

UserSchema.pre("save", function (next) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  });
  
  UserSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect password");
  };
  
  const User = mongoose.model("User", UserSchema);

export default User;