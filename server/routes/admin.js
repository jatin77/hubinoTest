const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// /products => GET
router.get("/customers", adminController.getCustomers);

// /add-product => POST
router.post("/add-customer", adminController.addCustomer);

// /edit-product => PUT
router.put("/edit-customer", adminController.editCustomer);

// /delete-product => DELTE
router.delete("/delete-customer", adminController.deleteCustomer);

module.exports = router;
