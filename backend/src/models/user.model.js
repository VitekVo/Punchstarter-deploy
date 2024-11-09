import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        userID: {
          type: String,
          required: true,
        },

        username: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true
        },

        surname:{
            type: String,
            required: true
        },

        email:{
            type: String,
            required: true
        },

        bDate:{
            type: Date,
            required: true
        },

        pNumber:{
            type: Number,
            required: true
        }
    }

);

const User = mongoose.model('User', UserSchema);
module.exports = User;