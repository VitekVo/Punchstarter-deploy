import mongoose, {Schema} from "mongoose";

const DonationSchema = new Schema(
    {
        project_id: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        user_id:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: true
        },

        amount: {
            type: Number,
            require: true
        },

        donation_date: {
            type: Date,
            default: Date.now
        }
    });
const Donation = mongoose.model('Donation', DonationSchema);
export default Donation;