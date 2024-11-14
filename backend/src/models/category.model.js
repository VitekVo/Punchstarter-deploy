import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    in_projects:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: false
        }
    ]
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;