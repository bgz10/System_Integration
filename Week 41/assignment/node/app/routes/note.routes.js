module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new note
    app.post('/notes', notes.create);

    // Retrieve all notes
    app.get('/notes', notes.findAll);

    // Retrieve a single note by id
    app.get('/notes/:noteId', notes.findOne);

    // Update a note by noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a note by noteId
    app.delete('/notes/:noteid', notes.delete);
}