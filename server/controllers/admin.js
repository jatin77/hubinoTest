const Customer = require("../models/customer");

// Add Customer
exports.addCustomer = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;

  Customer.findOne({ where: { email: email } })
    .then((customer) => {
      if (customer) {
        throw new Error("User Already Exists");
      } else {
        return Customer.create({
          name,
          email,
          phone,
          gender,
        });
      }
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};

// Update Customer
exports.editCustomer = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;

  let existingCustomer = null;
  Customer.findByPk(id)
    .then((customer) => {
      existingCustomer = customer;
      if (!customer) {
        throw new Error("No Customer found");
      }
      if (customer.email !== email) {
        return Customer.findOne({ where: { email: email } });
      }
    })
    .then((customer) => {
      if (customer) {
        throw new Error("Customer with same email already exists");
      }
      existingCustomer.name = name;
      existingCustomer.email = email;
      existingCustomer.phone = phone;
      existingCustomer.gender = gender;
      return existingCustomer.save();
    })
    .then((result) => {
      res.json("Customer Updated Successfully");
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};

// Get All Customers
exports.getCustomers = (req, res, next) => {
  Customer.findAll()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};

// Delete Customer
exports.deleteCustomer = (req, res, next) => {
  const customerID = req.body.customerID;
  Customer.findByPk(customerID)
    .then((customer) => {
      if (!customer) {
        throw new Error("Customer Not found");
      }
      return customer.destroy();
    })
    .then((result) => {
      res.json("Customer Deleted Successfully");
    })
    .catch((err) => {
      return res.status(400).json(err.message);
    });
};
