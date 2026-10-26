const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// GET route for employees
router.get('/', async (req, res) => {
  try {
    const { search = '', department = 'All', sort = '' } = req.query;

    const filter = {};

    if (search.trim()) {
      filter.name = {
        $regex: search.trim(),
        $options: 'i'
      };
    }

    if (department !== 'All') {
      filter.department = department;
    }

    let query = Employee.find(filter);

    if (sort === 'asc') {
      query = query.sort({ salary: 1 });
    } else if (sort === 'desc') {
      query = query.sort({ salary: -1 });
    }

    const employees = await query;
    const count = await Employee.countDocuments(filter);

    res.json({
      count,
      employees
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: 'Invalid employee ID' });
  }
});

// CREATE employee
router.post('/', async (req, res) => {
  try {
    const { name, department, salary } = req.body;

    const employee = await Employee.create({
      name,
      department,
      salary
    });

    res.status(201).json({
      message: 'Employee created successfully',
      employee
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE employee
router.put('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      message: 'Employee updated successfully',
      employee
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid employee ID or request' });
  }
});

module.exports = router;