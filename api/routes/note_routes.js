var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        db.collection('notes').insert(note, (err, result) => {
            if(err) res.send({'error': 'An error has occures.'});
            else res.send(result.ops[0]);
        });
    });

    app.get('/notes', (req, res) => {
        db.collection('notes').find({}).toArray(function(err, notes) {
            if(err) res.send({'error': 'An error has occures.'});
            else res.send(notes);
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {text:req.body.body, title:req.body.title};

        db.collection('notes').update(details, note, (err, result) => {
            if(err) res.send({'error': 'An error has occures.'});
            else res.send(note);
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id':new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if(err) res.send({'error': 'An error has occures.'});
            else res.send('Note ' + id + ' deleted.');            
        });
    });
};