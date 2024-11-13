import mongoose, {Schema, SchemaTypes} from 'mongoose';

const ProjectSchema = new Schema(
    {
        donations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Donation',
                required: true
            }
        ],

        user_id:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        title: {
            type: String,
            required: true
        },

        categories: [ // Array of categories for the project
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: false
            }
        ],

        follow_count:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: false,
            }
        ],

        description: {
            type: String,
            required: false
        },

        created_at: {
            type: Date,
            required: true
        },

        updated_at: {
            type: Date,
            required: false
        },

        deadline:{
            type: Date,
            required: true
        },

        goal_amount: {
            type: Number,
            required: true
        },

        images: {
            type: [Buffer],
            required: false
        }
    });
const Project = mongoose.model('Project', ProjectSchema);
export default Project;