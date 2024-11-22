import mongoose, {Schema, SchemaTypes} from 'mongoose';

const ProjectSchema = new Schema(
    {
        creatorId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        title: {
            type: String,
            required: true
        },

        category: {
                type: String,
                required: false
        },

        donations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Donation',
                default: []
            }
        ],

        description: {
            type: String,
            required: false
        },

        created_at: {
            type: Date,
            default: Date.now
        },

        deadline:{
            type: Date,
            required: true
        },

        goalAmount: {
            type: Number,
            required: true
        },

        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
                default: []
            }
        ],

        images: {
            type: [Buffer],
            required: false
        }
    });
const Project = mongoose.model('Project', ProjectSchema);
export default Project;