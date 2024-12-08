    import mongoose, { Schema } from "mongoose";
    import bcrypt from "bcrypt";

    const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: false,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        images: {
            type: [Buffer],
            required: false,
        },
    });

    // Před uložením hashuje heslo
    UserSchema.pre("save", function (next) {
        const salt = bcrypt.genSaltSync();
        this.passwordHash = bcrypt.hashSync(this.passwordHash, salt);
        next();
    });

    // Statická metoda pro přihlášení
    UserSchema.statics.login = async function (username, password) {
        const user = await this.findOne({ username });
        if (user) {
            const auth = await bcrypt.compare(password, user.passwordHash);
            if (auth) {
                return user;
            }
            throw Error("incorrect password");
        }
        throw Error("incorrect username");
    };

    // Virtuál pro followingProjects
    UserSchema.virtual("followingProjects", {
        ref: "Project",
        localField: "_id",
        foreignField: "followList",
    });

    // Virtuál pro contributions
    UserSchema.virtual("contributions", {
        ref: "Donation",
        localField: "_id",
        foreignField: "user_id",
    });

    UserSchema.set("toObject", { virtuals: true });
    UserSchema.set("toJSON", { virtuals: true });

    const User = mongoose.model("User", UserSchema);

    export default User;
