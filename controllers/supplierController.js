const Supplier = require('../models/supplier');

exports.index = async (req, res) => {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
};

exports.new = async (req, res) => {
    res.render('suppliers/new');
};

exports.create = async (req, res) => {
    await Supplier.create(req.body);
    res.redirect('/suppliers');
};

exports.edit = async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/edit', { supplier });
};

exports.update = async (req, res) => {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/suppliers');
};

exports.delete = async (req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
};
