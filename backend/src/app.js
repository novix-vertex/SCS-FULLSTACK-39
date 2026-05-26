/**
 * Create Server
 * Config Server
 */

const express = require("express")
const noteModel = require("./models/note.model")

const app = express()
app.use(express.json())


/**
 * - POST /api/notes
 * - Create new note and save in mongodb
 * - req.body = {title,description}
 */

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title, description
    })

    res.staus(201).json({
        message: "Note created successfully.",
        note: note
    })
})

/**
 * - GET /api/notes
 * - Fetch all the notes from mongodb and send in the response
 */

app.get('/api/notes', async (req, res) => {

    const notes = await noteModel.find();

    res.status(200).json({
        message: "All the notes fetched successfully.",
        notes: notes
    })
})

/**
 * - DELETE /api/notes:id
 * - Delete particular note by id coming from req.params
 */

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note deleted successfully."
    })
})

/**
 * - PATCH /api/notes:id
 * - Update descprition of a note in mongodb by id coming from req.params
 * - req.body = {description}
 */

app.patch('/api/notes:id', async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description });

    res.status(200).json({
        message: "Note description updated successfully"
    })
})

module.exports = app