import { createProjectDtoInSchema, createProjectDtoOutSchema, getProjectByIdDtoInSchema,getProjectByIdDtoOutSchema,
    updateProjectDtoInSchema, updateProjectDtoOutSchema, deleteProjectDtoInSchema, deleteProjectDtoOutSchema,
    addCommentToProjectDtoInSchema, addCommentToProjectDtoOutSchema
  } from '../validations/projectValidations.js';

const mockProjects = [
    {
        _id: "1",
        title: "Smart Home System",
        description: "A comprehensive smart home automation project aiming to simplify home management.",
        goalAmount: 5000.00,
        collectedAmount: 1500.00,
        createdAt: new Date("2024-01-10T12:00:00Z").toISOString(),
        creatorId: "635a3c9e6a0d5b4df77f3c1a",
        comments: ["635a3c9e6a0d5b4df77f3c2c", "635a3c9e6a0d5b4df77f3c2d"]
    },
    {
        _id: "2",
        title: "Eco-Friendly Energy Source",
        description: "A project focused on creating renewable energy solutions for small homes.",
        goalAmount: 10000.00,
        collectedAmount: 7500.00,
        createdAt: new Date("2024-02-15T08:30:00Z").toISOString(),
        creatorId: "635a3c9e6a0d5b4df77f3c1a",
        comments: ["635a3c9e6a0d5b4df77f3c2e", "635a3c9e6a0d5b4df77f3c2f"]
    }
];


const createProject = (req, res) => {
 
    const { error: inputError } = createProjectDtoInSchema.validate(req.body);
    if (inputError) {
        return res.status(400).json({ message: 'Invalid input data', error: inputError.details });
    }

    // Vytvoření projektu
    const { title, description, goalAmount } = req.body;
    const projectId = Date.now().toString(); 
    const createdAt = new Date().toISOString();

     
    const newProject = {
        projectId,
        title,
        description,
        goalAmount,
        createdAt
        };

    mockProjects.push(newProject);

    // Validace výstupního DTO
    const { error: outputError } = createProjectDtoOutSchema.validate(newProject);
    if (outputError) {
        return res.status(500).json({ message: 'Error in response data', error: outputError.details });
    }

    res.status(201).json(newProject);
};

const getProjectById = (req, res) => {
 
    const { error: inputError } = getProjectByIdDtoInSchema.validate(req.query);
    if (inputError) {
        return res.status(400).json({ message: "Invalid request data", error: inputError.details });
    }

    const { projectId } = req.query;
    const project = mockProjects.find(proj => proj._id === projectId);
    if (project) {
        const response = {
            projectId: project._id,
            title: project.title,
            description: project.description,
            goalAmount: project.goalAmount,
            createdAt: project.createdAt,
            createdBy: project.creatorId,
            comments: project.comments
        };


        const { error: outputError } = getProjectByIdDtoOutSchema.validate(response);
        if (outputError) {
            return res.status(500).json({ message: "Error in response data", error: outputError.details });
        }

        return res.status(200).json(response);
    } else {
        return res.status(404).json({ message: "Project not found" });
    }
};



 const updateProject = (req, res) => {
 
    const { error: inputError } = updateProjectDtoInSchema.validate(req.body);
    if (inputError) {
        return res.status(400).json({ message: 'Invalid request data', error: inputError.details });
    }

    const { projectId } = req.query; 
    const { title, description, goalAmount } = req.body;

    const project = mockProjects.find(proj => proj._id === projectId);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title;
    project.description = description;
    project.goalAmount = goalAmount;
    const updatedAt = new Date().toISOString();

    // Vytvoření výstupu
    const response = {
        projectId,
        title,
        description,
        goalAmount,
        updatedAt
    };

    // Validace výstupu
    const { error: outputError } = updateProjectDtoOutSchema.validate(response);
    if (outputError) {
        return res.status(500).json({ message: 'Error in response data', error: outputError.details });
    }

    res.status(200).json(response);
};

const deleteProject = (req, res) => {

    const { error: inputError } = deleteProjectDtoInSchema.validate(req.query);
    if (inputError) {
        return res.status(400).json({ message: 'Invalid request data', error: inputError.details });
    }

    const { projectId } = req.query;


    const projectIndex = mockProjects.findIndex(proj => proj._id === projectId);
    if (projectIndex === -1) {
        return res.status(404).json({ message: 'Project not found' });
    }


    mockProjects.splice(projectIndex, 1);
    const deletedAt = new Date().toISOString();


    const response = {
        message: 'Project deleted',
        deletedAt
    };


    const { error: outputError } = deleteProjectDtoOutSchema.validate(response);
    if (outputError) {
        return res.status(500).json({ message: 'Error in response data', error: outputError.details });
    }

    res.status(200).json(response);
};

const addCommentToProject = (req, res) => {
    // Získání parametrů z URL
    const { projectId, commentId } = req.query;

    // Validace vstupu
    const { error: inputError } = addCommentToProjectDtoInSchema.validate({ projectId, commentId });
    if (inputError) {
        return res.status(400).json({ message: 'Invalid request data', error: inputError.details });
    }

    // Najdeme projekt podle projectId
    const project = mockProjects.find(proj => proj._id === projectId);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

 
    // Přidání commentId do pole comments projektu
    project.comments.push(commentId);
    const addedAt = new Date().toISOString();

    // Vytvoření výstupní odpovědi
    const response = {
        projectId,
        commentId,
        addedAt
    };

    // Validace výstupu
    const { error: outputError } = addCommentToProjectDtoOutSchema.validate(response);
    if (outputError) {
        return res.status(500).json({ message: 'Error in response data', error: outputError.details });
    }

    res.status(200).json(response);
};

export { createProject, getProjectById, updateProject, deleteProject, addCommentToProject };
