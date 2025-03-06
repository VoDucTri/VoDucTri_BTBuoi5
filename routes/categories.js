var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category');

// Lấy danh sách danh mục
router.get('/', async (req, res) => {
    let categories = await categoryModel.find();
    res.status(200).send({ success: true, data: categories });
});

// Lấy danh mục theo ID
router.get('/:id', async (req, res) => {
    try {
        let category = await categoryModel.findById(req.params.id);
        if (!category) throw new Error('Danh mục không tồn tại');
        res.status(200).send({ success: true, data: category });
    } catch (error) {
        res.status(404).send({ success: false, message: error.message });
    }
});

// Tạo danh mục mới
router.post('/', async (req, res) => {
    try {
        let newCategory = new categoryModel(req.body);
        await newCategory.save();
        res.status(200).send({ success: true, data: newCategory });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// Cập nhật danh mục
router.put('/:id', async (req, res) => {
    try {
        let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) throw new Error('Danh mục không tồn tại');
        res.status(200).send({ success: true, data: updatedCategory });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

// Xóa danh mục
router.delete('/:id', async (req, res) => {
    try {
        let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
        if (!deletedCategory) throw new Error('Danh mục không tồn tại');
        res.status(200).send({ success: true, message: 'Danh mục đã bị xóa' });
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
});

module.exports = router;
