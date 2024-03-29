const router = require('express').Router();
var mongoose = require('mongoose');
let Unit = require('../models/unit.model');


router.route('/').get((req, res) => {
    Unit.find()
        .then(units => res.json(units))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const identifier = req.body.identifier;
    const name = req.body.name;
    const description = req.body.description;
    const size = req.body.size;
    const products = [];
    const units = [];
    const images = req.body.images;
    const tags = req.body.tags;

    const newUnit = new Unit({
        identifier,
        name,
        description,
        size,
        products,
        units,
        images,
        tags,
    });

    newUnit.save()
        .then(() => res.json('Unit added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Unit.findById(req.params.id)
        .then(unit => res.json(unit))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/details').get((req, res) => {
    Unit.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id)
            }

        },
        {
            $lookup:
            {
                from: "products",
                localField: "products.identifier",
                foreignField: "identifier",
                as: "products_in_unit"
            }
        },
        {
            $lookup:
            {
                from: "units",
                localField: "units",
                foreignField: "identifier",
                as: "units_in_unit"
            }
        },
        {
            $lookup:
            {
                from: "rooms",
                localField: "identifier",
                foreignField: "units",
                as: "in_room"
            }
        }

    ]).exec((err, products_in_unit) => {
        if (err) res.status(400).json('Error') + err;
        console.log(products_in_unit);
        res.json(products_in_unit)
    })
});

router.route('/update/:id').post((req, res) => {
    Unit.findById(req.params.id)
        .then(unit => {
            unit.identifier = req.body.identifier;
            unit.name = req.body.name;
            unit.description = req.body.description;
            unit.size = req.body.size;
            unit.units = req.body.units;
            unit.images = req.body.images;
            unit.tags = req.body.tags;

            unit.save()
                .then(() => res.json('Unit updated!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Unit.findOne({ _id: req.params.id })
        .then(unit => {
            unit.delete()
                .then(() => res.json('Unit deleted!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/identifier/:id').get((req, res) => {
    Unit.findOne({ identifier: req.params.id })
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/identifier/:id').post((req, res) => {
    Unit.findOne({ identifier: req.params.id })
        .then(unit => {
            unit.identifier = req.body.identifier;
            unit.name = req.body.name;
            unit.description = req.body.description;
            unit.size = req.body.size;
            unit.units = req.body.units;
            unit.images = req.body.images;
            unit.tags = req.body.tags;

            unit.save()
                .then(() => res.json('Unit updated!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/identifier/:id').delete((req, res) => {
    Unit.findOne({ identifier: req.params.id })
        .then(unit => {
            unit.delete()
                .then(() => res.json('Unit deleted!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;