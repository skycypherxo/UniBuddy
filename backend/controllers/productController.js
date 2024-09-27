const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

exports.createProduct = [
  upload.single('file'),
  async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.user);
      const { title, description, originalPrice, resellingPrice, category } = req.body;
      const filePath = req.file ? req.file.path : null;

      const product = new Product({
        title,
        description,
        originalPrice,
        resellingPrice,
        category,
        file: filePath,
        seller: req.user.id,
      });

      await product.save();
      res.status(201).json({ message: 'Product listed successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error listing product', error });
    }
  },
];


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name'); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

exports.contactSeller = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate('seller', 'name email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Contact seller',
      seller: product.seller,
      product: {
        title: product.title,
        description: product.description,
        price: product.resellingPrice,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error contacting seller', error });
  }
};


exports.buyProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.status === 'sold') {
      return res.status(400).json({ message: 'Product is already sold' });
    }

    product.status = 'sold';
    product.buyer = req.user.id;

    await product.save();

    res.status(200).json({ message: 'Product bought successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error buying product', error });
  }
};

