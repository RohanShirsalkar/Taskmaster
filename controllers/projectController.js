const Project = require('../models/projectModel');

const timestamp = new Date().getTime();


// @endpoint - /add (POST)
// @access private
async function create(req, res) {
    const { title } = req.body;
    const { id } = req.user;
    try {
        const body = {
            userId: id,
            startDate: timestamp,
            title: title,
            isActive: true
        };

        if (!id) {
            res.status(400).json({ message: "No user" });
        };

        if (!title) {
            res.status(400).json({ message: "all fields are mandatory" });
        } else {
            const project = await Project.create(body);
            res.json(project);
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}


// @endpoint - / (GET)
// @access private  
async function find(req, res) {
    const { id } = req.user;
    try {
        if (!id) {
            res.status(400).json({ message: "No user" });
        };
        const projects = await Project.find({ userId: id });
        res.json(projects);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}

// @endpoint - /:id (GET)
// @access private
async function findById(req, res) {
    const projectId = req.params.id
    try {
        if (!projectId) {
            res.status(400).json({ message: "No user" });
        };
        const project = await Project.findOne({ _id: projectId })
        res.json(project)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}

// @endpoint - /edit/:id (PUT)
// @access private
async function updateById(req, res) {
    const { isActive, title } = req.body;
    const taskId = req.params.id;
    try {
        if (!taskId) {
            res.status(400).json({ message: "ID not mentioned" });
        };
        if (!isActive, !title) {
            res.status(400).json({ message: "all fields required" });
        } else {
            const body = {
                isActive,
                title
            }
            const project = await Project.findByIdAndUpdate(taskId, body, { new: true })
            res.json(project)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}


// @endpoint - /delete/:id (DELETE)
// @access private
async function deleteById(req, res) {
    const { isActive, title } = req.body;
    const taskId = req.params.id;
    try {
        if (!taskId) {
            res.status(400).json({ message: "ID not mentioned" });
        } else {
            const project = await Project.findByIdAndRemove(taskId)
            res.json(project)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}


module.exports = { find, create, updateById, deleteById, findById };