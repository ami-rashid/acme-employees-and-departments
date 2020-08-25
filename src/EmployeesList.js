import React from 'react'
import ReactDOM from 'react-dom'

//Prop to fire someone
const Fire = (props) => {
  return <button className="fire" id={`fire-/api/employees/${props.id}`}>Remove from Store</button>
}

//Prop to remove someone from their department
const Remove = (props) => {
  return <button className="remove" id={ `remove-/api/employees/${props.id}` }>Remove from Department</button>
}

//Generate buttons for each employee
const EmployeesList = (props) => {
  return props.people.map(person => {
    let buttons;
    if (props.deptId) {
      buttons = <div> <Fire id={person.id}/> <Remove id={person.id}/> </div>
    } else {
      buttons = <Fire id={person.id}/>
    }

    return (<div className="employees" key = { person.id }>
    <p>{ person.name }</p>
    { buttons }
    </div>
    )}
    )
}

export default EmployeesList;