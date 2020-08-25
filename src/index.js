import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import DepartmentsList from './DepartmentsList'

class App extends React.Component {
  constructor(){
    super(),
    this.state = {
      departments: [],
      employees: []
    },
    this.handleClickEvent = this.handleClickEvent.bind(this)
  }

  async getApi(){
    const [departmentApi, employeeApi] = await Promise.all([
      axios.get('/api/departments'),
      axios.get('/api/employees')
    ]);
    const [depts, empls] = await Promise.all([
      departmentApi.data,
      employeeApi.data
    ]);
    depts.unshift({id: null})
    return { depts, empls }
  }

  async componentDidMount(){
    const { depts, empls } = await this.getApi();
    this.setState({
      departments: depts,
      employees: empls
    });
    ReactDOM.findDOMNode(this).addEventListener('click', this.handleClickEvent)
  }

  componentWillUnmount(){
    ReactDOM.findDOMNode(this).removeEventListener('click', this.handleClickEvent)
  }

  async handleClickEvent(event){
    if (event.target.tagName == 'BUTTON') {
      const action = (event.target.id).split('-')[1];

      if (event.target.className === 'fire') {
        await axios.delete(action)
      } else {
        await axios.put(action);
      }
      
      const { depts, empls } = await this.getApi();
      this.setState({
        departments: depts,
        employees: empls
      });
      }
    }

  render(){
    const { employees, departments } = this.state;
    return ( <div className='dept-container'>
       <DepartmentsList departments={departments} employees={employees}/>
    </div>)
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));