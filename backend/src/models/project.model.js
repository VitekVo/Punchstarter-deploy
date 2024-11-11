import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema(
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
        created: {
            type: Date,
            required: true
        },
        goal_amount: {
            type: mongoose.Schema.Types.Decimal128,
            required: true
        }
    });