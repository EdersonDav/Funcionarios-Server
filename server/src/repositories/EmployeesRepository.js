import createEmployeesService from '../services/CreateEmployeesService';
import createNewDataBaseService from '../services/CreateNewDataBaseService';

let employees = createEmployeesService();

const employeesMethods = {
  getAll: () =>{
    return employees
  },

  search:(key, value) =>{
    const employee = employees.filter(emp => {
      if(emp[key] == value){
        return emp;
      }
    })
    return employee;
  },

  countByState:() =>{
    const countState = {}
    employees.forEach(emp =>{
      if(countState[emp.ufNascimento] == undefined){
        countState[emp.ufNascimento] = 0
      }
      countState[emp.ufNascimento] += 1
    })
    return countState
  },

  salaryRange:(min, max)=>{
    const employeesRange = employees.filter(emp => emp.salario >= min && emp.salario <= max)

    return employeesRange
  },

  deleteEmployee: (cpf)=>{
    try{
      const newEmployees = employees.filter(emp => emp.cpf != cpf)

      createNewDataBaseService(newEmployees);

      setTimeout(() => {
        employees = createEmployeesService();
      }, 3000);

      return {message: 'Deleted employee'}
    }catch(e){
      return {message: e}
    }
  },

  createOrUpdate: ({dataCadastro, cargo, cpf, nome, ufNascimento, salario, status})=>{
    try{
      const employeeCreate = {dataCadastro, cargo, cpf, nome, ufNascimento, salario, status}

      const [employeeExists] = employees.filter(emp => emp.cpf == cpf)

      const employeeIndex = employees.indexOf(employeeExists)

      const newEmployees = employees

      let msg =""

      if(employeeIndex != -1){
        msg = "Updated employee"
        newEmployees[employeeIndex] = employeeCreate
      }else{
        msg ="Employee created"
        newEmployees.push(employeeCreate)
      }

      createNewDataBaseService(newEmployees);

      setTimeout(() => {
        employees = createEmployeesService();
      }, 3000);

      return {message: msg}
    }catch(e){
      return {message: e}
    }
  }

}

export default employeesMethods;



