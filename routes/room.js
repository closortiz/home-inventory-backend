const router = require('express').Router();
let Room = require('../models/room.model');

router.route('/').get((req, res) => {
    Room.find()
        .then(rooms => res.json(rooms))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const identifier = req.body.identifier;
    const name = req.body.name;
    const description = req.body.description;
    const size = req.body.size;
    const units = [];
    const images = req.body.images;
    const tags = req.body.tags;

    const newRoom = new Room({
        identifier,
        name,
        description,
        size,
        units,
        images,
        tags,
    });

    newRoom.save()
        .then(() => res.json('Room added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Room.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Room.findById(req.params.id)
        .then(room => {
            room.identifier = req.body.identifier;
            room.name = req.body.name;
            room.description = req.body.description;
            room.size = req.body.size;
            room.units = req.body.units;
            room.images = req.body.images;
            room.tags = req.body.tags;

            room.save()
                .then(() => res.json('Room updated!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/identifier/:id').get((req, res) => {
    Room.findOne({ identifier: req.params.id })
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/identifier/:id').post((req, res) => {
    Room.findOne({ identifier: req.params.id })
        .then(room => {
            room.identifier = req.body.identifier;
            room.name = req.body.name;
            room.description = req.body.description;
            room.size = req.body.size;
            room.units = req.body.units;
            room.images = req.body.images;
            room.tags = req.body.tags;

            room.save()
                .then(() => res.json('Room updated!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;