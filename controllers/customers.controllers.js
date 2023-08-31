const Customer = require("../models/customers.model.js");

// Create and Save a new Customer
exports.create = async (req, res) => {
    try {
        // Validate request
        console.log(req.body);
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Body cannot be empty" });
        }

        // Create a Customer
        const customer = new Customer({
            name: req.body.name,
            address: req.body.address,
            age: req.body.age
        });

        // Save Customer in the database
        Customer.create(customer, (err, data) => {
            if (err)
                res.status(500).json({
                    message:
                        err.message || "Error occurred while creating the Customer."
                });
            else res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

exports.findAll = async (req, res) => {
    try {
        Customer.getAll((err, data) => {
            if (err)
                res.status(500).json({
                    message:
                        err.message || "Error occurred while retrieving customers."
                });
            else res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.findOne = async (req, res) => {
    try {
        Customer.findById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found")
                    res.status(404).json({
                        message: `Not found Customer with id ${req.params.id}.`
                    });
                else
                    res.status(500).json({
                        message: "Error retrieving Customer with id " + req.params.id
                    });
            } else res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).json({
            message: "Content can not be empty!"
        });
        return;
    }

    Customer.updateById(
        req.params.id,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found")
                    res.status(404).json({
                        message: `Not found Customer with id ${req.params.id}.`
                    });
                else
                    res.status(500).json({
                        message: "Error updating Customer with id " + req.params.id
                    });
            } else res.status(200).json(data);
        }
    );
}

exports.deleteOne = (req, res) => {
    Customer.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).json({
                    message: `Not found Customer with id ${req.params.id}.`
                });
            else
                res.status(500).json({
                    message: "Could not delete Customer with id " + req.params.id
                });
        } else res.status(200).json({ message: `Customer was deleted successfully!` });
    });
}

exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
        if (err)
            res.status(500).json({
                message:
                    err.message || "Error occurred while removing all customers."
            });
        else res.status(200).json({ message: `All Customers were deleted successfully!` });
    });
}