const mongoose = require('mongoose');
const fs = require('fs');
const dbConfig = require("../config/db");
const sizes = require("../sizes.json");
const { ObjectId } = require('mongodb');


function uploadProductsMiddleware(req, res) {
    mongoose.connect(
        dbConfig.url + dbConfig.database,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
    // Product Model
    const Product = mongoose.model(
        'Product',
        new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            stock: {
                type: Number,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            trailerURL: {
                type: String,
                required: true
            },
            imageIds: [{
                type: ObjectId
            }]
        })
    );

    const Image = mongoose.model(
        'Image',
        new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            data: {
                type: Buffer,
                required: true
            }
        })
    );

    const images = req.files.file.map((image, index) => {
        const imageId = new mongoose.Types.ObjectId();
        return {
            _id: imageId,
            name: `${req.body.title} image ${index + 1}`,
            data: image.buffer
        }
    })
    const body = req.body;
    const productData = {
        title: body.title,
        description: body.description,
        price: body.price,
        stock: 10,
        rating: body.rating,
        trailerURL: body.trailerURL,
        imageIds: images.map(image => {
            return image._id
        })
    }

    const product = new Product(productData);
    product.save()
        .then(() => console.log('Product Saved Successfully!'))
        .catch((err) => console.log(`Error in Saving Product: ${err}`));   
    
    images.map(imageData => {
        const image = new Image(imageData);
        image.save()
            .then(() => console.log('Image Saved Successfully!'))
            // .then(() => mongoose.connection.close(() => console.log('Connection Closed successfully!')))
            .catch((err) => console.log(`Error in Saving Image: ${err}`));

    })
}

module.exports = uploadProductsMiddleware;