import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        user_id: {
          type: String,
          required: true,
            unique: true
        },

        username: {
            type: String,
            required: true,
            unique: true
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
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
        },

        bDate:{
            type: Date,
            required: true
        },

        pNumber:{
            type: String,
            required: true,
            match: [/^\d+$/, 'Phone number should contain only digits.'],
        }
    }

);

const User = mongoose.model('User', UserSchema);
export default User;