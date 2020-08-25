const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const pg = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const { Employees, Departments, db } = require('./db/index');
const PORT = 3000;

app.use(bodyParser.json());
app.use('/src', express.static('./src'));
app.use('/dist', express.static('./dist'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/employees', async (req, res, next) => {
  const employees = await Employees.findAll();
  res.send(employees);
});

app.get('/api/departments', async (req, res, next) => {
  const departments = await Departments.findAll();
  res.send(departments);
})

app.delete('/api/employees/:id', async (req, res, next) => {
  await Employees.destroy({ where: {
    id: req.params.id
  }});
  res.send(`Deleted ${req.params.name}`)
})

app.put('/api/employees/:id', async (req, res, next) => {
  const employee = await Employees.findOne({where: {
    id: req.params.id
  }})
  await employee.setDepartment(null);
  const employees = await Employees.findAll();
  res.send(employees);
})

const init = async function() {
  db.sync();
  console.log('Database has been synced!')
  app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}...`)
  });
};

init();
