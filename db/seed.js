const faker = require('faker');
const { Employees, 
        Departments, 
        db } = require('./index.js');

//Using Faker to generate random Employees and Departments
const employeeNames = [];
const departmentNames = [];

for (let i = 0; i < 50; i++) {
  employeeNames.push({name: faker.name.firstName()})
};

for (let i = 0; i < 5; i++) {
  departmentNames.push({name: faker.commerce.department()});
};

//Asign members to a random department or are unassigned
async function assignEmployees(allEmployees, allDepartments) {
  for (let i = 0; i < allEmployees.length; i++) {
    const randomNumber = Math.floor(Math.random() * 6);

    const employee = allEmployees[i];
    const randomDept = allDepartments.find(department => department.id === randomNumber);
    if (randomNumber === 0) {
      await employee.setDepartment(null);
    } else {
      await employee.setDepartment(randomDept);
    }
  }
  console.log('All employees have been randomly assigned!')
};

//Seed database
async function seed() {
  try {
    await db.sync({force: true});
    console.log('Dropped old data, now inserting data');

    await Promise.all([
      Employees.bulkCreate(employeeNames),
      Departments.bulkCreate(departmentNames)
    ]);
    console.log('Added all employees and departments')

    const [ employees, departments ] = await Promise.all([
      Employees.findAll(),
      Departments.findAll()
    ])
    await assignEmployees(employees, departments);
    
  } catch (err) {
    console.error('There was an unexpected error:', err, err.stack);
  } finally {
    db.close()
  }
}

seed();