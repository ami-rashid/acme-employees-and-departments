const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/acmemegastore');
const { STRING } = Sequelize;

const Employees = db.define('employees', {
    name: STRING
});
  
const Departments = db.define('departments', {
    name: STRING
});

Employees.belongsTo(Departments);
Departments.hasMany(Employees);

module.exports = {
  Employees,
  Departments,
  db
}
