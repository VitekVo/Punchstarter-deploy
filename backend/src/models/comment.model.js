import mongoose, {Schema} from "mongoose";

const CommentSchema = new Schema(
    {
        user_id:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        project_id:{
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },

        comment: {
            type: String,
            required: true,
            maxlength: 500
        },

    });

CommentSchema.index({ user_id: 1 });
CommentSchema.index({ project_id: 1 });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;