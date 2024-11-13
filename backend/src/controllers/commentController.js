import { createCommentDtoInSchema, createCommentDtoOutSchema, getCommentsByProjectIdDtoInSchema, getCommentsByProjectIdDtoOutSchema,
    updateCommentdtoInSchema, updateCommentdtoOutSchema, deleteCommentdtoInSchema, deleteCommentdtoOutSchema
} from '../validations/commentValidation.js';

const mockComments = [
    {
        _id: "1",
        projectId: "1",
        userId: "1",
        content: "This is the first comment.",
        createdAt: "2023-11-05T10:00:00Z"
    },
    {
        _id: "2",
        projectId: "1",
        userId: "2",
        content: "This is the second comment.",
        createdAt: "2023-11-06T12:00:00Z"
    },
    {
        _id: "3",
        projectId: "2",
        userId: "1",
        content: "This is the first comment for project 2.",
        createdAt: "2023-11-07T14:30:00Z"
    },
    {
        _id: "4",
        projectId: "2",
        userId: "2",
        content: "This is the second comment for project 2.",
        createdAt: "2023-11-08T09:15:00Z"
    }
];

let commentCounter = 5; 

const createComment = (req, res) => {
 
    const { projectId, userId, content } = req.body;


    const { error: inputError } = createCommentDtoInSchema.validate({ projectId, userId, content });
    if (inputError) {
        return res.status(400).json({ message: 'Invalid request data', error: inputError.details });
    }

    let _id = commentCounter.toString();

    const newComment = {
        _id,
        projectId,
        userId,
        content,
        createdAt: new Date().toISOString()
    };
    commentCounter++;

    mockComments.push(newComment);


    const response = {
        commentId: newComment._id,
        content: newComment.content,
        createdAt: newComment.createdAt
    };

    const { error: outputError } = createCommentDtoOutSchema.validate(response);
    if (outputError) {
        return res.status(500).json({ message: 'Error in response data', error: outputError.details });
    }

    res.status(201).json(response);
};

const getCommentsByProjectId = (req, res) => {
 
    const { projectId } = req.query;


    const { error: inputError } = getCommentsByProjectIdDtoInSchema.validate({ projectId });
    if (inputError) {
        return res.status(400).json({ message: 'Invalid request data', error: inputError.details });
    }


    const comments = mockComments
        .filter(comment => comment.projectId === projectId)
        .map(comment => ({
            commentId: comment._id,
            content: comment.content,
            createdAt: comment.createdAt,
            userId: comment.userId
        }));

        const response = { comments };


        const { error: outputError } = getCommentsByProjectIdDtoOutSchema.validate(response);
    if (outputError) {
        return res.status(500).json({ message: 'Error in response data', error: outputError.details });
    }

    res.status(200).json(response);
};

const updateComment = (req, res) => {
    const { commentId } = req.query;
    const { content } = req.body;


    const { error: inputError } = updateCommentdtoInSchema.validate({ content });
    if (inputError) {
        return res.status(400).json({ error: inputError.details[0].message });
    }


    const comment = mockComments.find(comment => comment._id === commentId);
    if (!comment) {
        return res.status(404).json({ error: "Comment not found." });
    }


    comment.content = content;
    comment.updatedAt = new Date().toISOString();


    const outputData = {
        commentId: comment._id,
        content: comment.content,
        updatedAt: comment.updatedAt
    };


    const { error: outputError } = updateCommentdtoOutSchema.validate(outputData);
    if (outputError) {
        return res.status(500).json({ error: outputError.details[0].message });
    }


    res.status(200).json(outputData);
};

const deleteComment = (req, res) => {
    const { commentId } = req.query;


    const { error } = deleteCommentdtoInSchema.validate({ commentId });
    if (error) return res.status(400).json({ error: error.details[0].message });


    const index = mockComments.findIndex(comment => comment._id === commentId);
    if (index === -1) return res.status(404).json({ error: "Comment not found" });


    mockComments.splice(index, 1);


    const dtoOut = {
        message: "Comment deleted successfully",
        deletedAt: new Date().toISOString()
    };


    const { error: outputError } = deleteCommentdtoOutSchema.validate(dtoOut);
    if (outputError) return res.status(500).json({ error: outputError.details[0].message });

    return res.status(200).json(dtoOut);
};


export { createComment, getCommentsByProjectId, updateComment, deleteComment };
