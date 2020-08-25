import React from 'react'
import ReactDOM from 'react-dom'
import EmployeesList from './EmployeesList'

//Generate department GUI with assigned employees
const DepartmentsList = (props) => {
  return props.departments.map(department => {
    const assignedEmployees = props.employees.filter(employee => employee.departmentId === department.id)
    
    return (<div key={ department.id || 0 } className={`department ${department.name}`}>
            <h2>{`${department.name || 'Employees Without Departments'} (${assignedEmployees.length})`}</h2>
            <EmployeesList deptId={ department.id } people={ assignedEmployees }/>
            </div>
    )
  })
}

export default DepartmentsList;