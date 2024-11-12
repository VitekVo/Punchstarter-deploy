import mongoose, {Schema} from 'mongoose';
import {date, number} from "joi";

const ProjectSchema = new Schema(
    {
        project_id: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        created_at: {
            type: Date,
            required: true
        },
        deadline:{
            type: Date,
            required: true
        },
        goal_amount: {
            type: Number,
            required: true
        }
    });
const Project = mongoose.model('Project', ProjectSchema);
export default Project;