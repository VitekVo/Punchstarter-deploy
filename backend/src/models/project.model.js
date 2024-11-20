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

        followCount:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                unique: true,
                required: false,
            }
        ],

        donations: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Donation',
                required: true
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
                ref: 'Comments',
                required: false
            }
        ],

        images: {
            type: [Buffer],
            required: false
        }
    });
const Project = mongoose.model('Project', ProjectSchema);
export default Project;