const mongoose = require('../db');
const Task = require('../models/taskModel')

const timestamp = new Date().getTime();


module.exports = {

    // @endpoint = / get
    // @access private
    find: async (req, res) => {
        try {
            const taskList = await Task.find({ projectId: req.params.projectId })
            res.json(taskList)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // @endpoint = /add post 
    // @params = task, isCompleted
    create: async (req, res) => {
        try {
            const newTask = new Task({
                userId: req.user.id,
                projectId: req.body.projectId,
                task: req.body.task,
                endDate: req.body.endDate,
                priority: req.body.priority,
                isCompleted: req.body.isCompleted,
                timestamp: timestamp
            })
            console.log(req.body);
            await newTask.save();
            res.json(newTask)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // @endpoint - /edit/id put
    // @params - id, body
    updateByid: async (req, res) => {
        const id = req.params.id
        const body = {
            task: req.body.task,
            isCompleted: req.body.isCompleted
        };

        try {
            const updatedTask = await Task.findByIdAndUpdate(id, body, {
                new: true,
            })

            if (!updatedTask) {
                res.status(404).json({ error: 'User not found' });
            }

            res.json(updatedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // @endpoint - /delete/id
    // @params - id
    deleteById: async (req, res) => {
        const id = req.params.id
        try {
            const deletedTask = await Task.findByIdAndRemove(id)

            if (!deletedTask) {
                res.status(404).json({ error: 'User not found' });
            }

            res.json(deletedTask)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }


}