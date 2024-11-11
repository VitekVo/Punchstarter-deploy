import mongoose from 'mongoose';

const UserCredentialSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
            unique: true
        },

        passwordHash: {
        type: String,
        required: true,
    }
}

);

const UserCredential = mongoose.model('User', UserCredentialSchema);
export default UserCredential;