import mongoose, {Schema} from "mongoose";
import Project from "./project.model.js";

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
DonationSchema.post(["save", "remove"], async function () {
    try {
        const projectId = this.project_id;
        console.log(`Project ID: ${projectId}`);

        const totalAmount = await Donation.aggregate([
            { $match: { project_id: projectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const newSum = totalAmount[0]?.total || 0;
        console.log(`Total amount from donations: ${newSum}`);


        const project = await Project.findById(projectId);


        if (project.sum !== newSum) {
            await Project.findByIdAndUpdate(projectId, { sum: newSum });
            console.log(`Project ${projectId} sum updated successfully.`);
        } else {
            console.log(`No update needed. The sum is the same.`);
        }
    } catch (err) {
        console.error("Error updating project sum:", err);
    }
});


const Donation = mongoose.model('Donation', DonationSchema);
export default Donation;