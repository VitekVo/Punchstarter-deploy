import mongoose, {Schema} from 'mongoose';
import bcrypt from "bcrypt"

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false
        },

        passwordHash: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            value: Date.now(),
        },

        followingProjects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Project',
                required: false,
            }
        ],
        contributions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Donations',
                required: false
            }
        ]
    }

);

UserSchema.pre("save", function (next) {
    const salt = bcrypt.genSaltSync();
    this.passwordHash = bcrypt.hashSync(this.passwordHash, salt);
    next();
  });
  
  UserSchema.statics.login = async function (username, passwordHash) {
    const user = await this.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(passwordHash, user.passwordHash);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect password");
  };
  
  const User = mongoose.model("User", UserSchema);

export default User;