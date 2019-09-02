const router = require('express').Router();
const mongoose = require('mongoose');
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

router.route('/:id/details').get((req, res) => {
    Room.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id)
            }

        },
        {
            $lookup:
            {
                from: "units",
                localField: "units",
                foreignField: "identifier",
                as: "units_in_room"
            }
        },
        {
            $lookup:
            {
                from: "products",
                localField: "units_in_room.products.identifier",
                foreignField: "identifier",
                as: "products_in_room"
            }
        }

    ]).exec((err, units_in_room) => {
        if (err) res.status(400).json('Error') + err;
        console.log(units_in_room);
        res.json(units_in_room)
    })
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