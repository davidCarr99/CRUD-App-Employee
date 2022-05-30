import { Component } from '@angular/core';
import { Employee } from './modules/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*Arreglo para los empleados y mostrarlo en la interfaz*/
  employeeArray: Employee[]=[
    
  ];

  /*Formulario empleado*/
  selectedEmployee: any =  {
    name: '',
    lastName: '',
    phone: 0,
    address: '',
  };

  /*Evento Añadir Empleado*/
  addOrEdit(){
    this.selectedEmployee.id = this.employeeArray.length +1;
    this.employeeArray.push(this.selectedEmployee);
    
    /*Limpiar el Formulario*/
    this.selectedEmployee =  {
      name: '',
      lastName: '',
      phone: 0,
      address: '',
    };
  }
  /*Edtar el Empleado*/
  edit(employee : Employee){
    this.selectedEmployee = employee;
  }

  /*Eliminar Empleado*/
  delete(){
    if(confirm('Are you sure delete this employee?')){
      this.employeeArray = this.employeeArray.filter(elem => elem != this.selectedEmployee);
    }
    this.selectedEmployee = {
      name: '',
      lastName: '',
      phone: 0,
      address: '',
    }
  }
}
