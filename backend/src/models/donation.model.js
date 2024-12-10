import mongoose, {Schema} from "mongoose";

const DonationSchema = new Schema(
    {
        user_id:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        project_id: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        amount: {
            type: Number,
            require: true
        },
    });
const Donation = mongoose.model('Donation', DonationSchema);
export default Donation;