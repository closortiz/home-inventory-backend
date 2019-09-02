const router = require('express').Router();
const mongoose = require('mongoose');
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const identifier = req.body.identifier;
    const identifier_type = 'upc';
    if (req.body.identifier.startsWith("978")) {
        identifier_type = 'isbn';
    }
    const title = req.body.title;
    const description = req.body.description;
    const brand = req.body.brand;
    const dimension = req.body.dimension;
    const weight = req.body.weight;
    const lowest_price = req.body.lowest_recorded_price;
    const highest_price = req.body.highest_recorded_price;
    const images = req.body.images;
    const tags = req.body.tags;
    const quantity = 1;

    const newProduct = new Product({
        identifier,
        identifier_type,
        title,
        description,
        brand,
        dimension,
        weight,
        lowest_price,
        highest_price,
        images,
        tags,
        quantity
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/details').get((req, res) => {
    Product.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id)
            }

        },
        {
            $lookup:
            {
                from: "units",
                localField: "identifier",
                foreignField: "products.identifier",
                as: "product_located_inside_unit"
            }
        },
        {
            $lookup:
            {
                from: "units",
                localField: "product_located_inside_unit.identifier",
                foreignField: "units",
                as: "unit_located_inside_unit"
            }
        },
        {
            $lookup:
            {
                from: "rooms",
                localField: "product_located_inside_unit.identifier",
                foreignField: "units",
                as: "located_in_room"
            }
        },
        

    ]).exec((err, products_in_unit) => {
        if (err) res.status(400).json('Error') + err;
        console.log(products_in_unit);
        res.json(products_in_unit)
    })
});

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.username = req.body.username;
            product.description = req.body.description;
            product.identifier_type = 'upc';
            product.title = req.body.title;
            product.description = req.body.description;
            product.brand = req.body.brand;
            product.dimension = req.body.dimension;
            product.weight = req.body.weight;
            product.lowest_price = req.body.lowest_recorded_price;
            product.highest_price = req.body.highest_recorded_price;
            product.images = req.body.images;
            product.tags = req.body.tags;
            product.quantity = 1;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/increment/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.quantity = product.quantity > 0 ? product.quantity - 1 : 0;

            product.save()
                .then(() => res.json(product.quantity))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/decrement/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.quantity = product.quantity + 1;

            product.save()
                .then(() => res.json(product.quantity))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/identifier/:upc').get((req, res) => {
    Product.findOne({ identifier: req.params.upc })
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/identifier/:id').post((req, res) => {
    Product.findOne({ identifier: req.params.id })
        .then(product => {
            product.username = req.body.username;
            product.description = req.body.description;
            product.identifier_type = 'upc';
            product.title = req.body.title;
            product.description = req.body.description;
            product.brand = req.body.brand;
            product.dimension = req.body.dimension;
            product.weight = req.body.weight;
            product.lowest_price = req.body.lowest_recorded_price;
            product.highest_price = req.body.highest_recorded_price;
            product.images = req.body.images;
            product.tags = req.body.tags;
            product.quantity = 1;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/increment/identifier/:id').post((req, res) => {
    Product.findOne({ identifier: req.params.id })
        .then(product => {

            product.quantity = product.quantity + 1;

            product.save()
                .then(() => res.json(product.quantity))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/decrement/identifier/:id').post((req, res) => {
    Product.findOne({ identifier: req.params.id })
        .then(product => {

            product.quantity = product.quantity > 0 ? product.quantity - 1 : 0;

            product.save()
                .then(() => res.json(product.quantity))
                .catch(err => res.status(400).json('Error ' + err));
        }).catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;