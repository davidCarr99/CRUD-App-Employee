import { Component, OnInit } from '@angular/core';
import { Employee } from './modules/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /*Arreglo para los empleados y suministrarlos en la interfaz*/
  employeeArray: Employee[] = [];

  /*Objeto del empleado para la DB*/
  employeeDB: Employee;

  /*variables alerta y URL de DB*/
  alert: boolean = false;
  typeAlert: string = '';
  textAlert: string = '';
  private urlDB: string = 'https://console.firebase.google.com/u/0/project/app-employees-c8215/firestore/data/~2Femployees~2FAkMntHRTF2aUPorfU2mz'; 

  /*Swicth para cambiar de añadir a editar/eliminar */
  employeeEdit: boolean = false;

  /*Objeto guarda los datos del formulario*/
  selectedEmployee: any = {
    name: '',
    lastName: '',
    phone: 0,
    address: '',
  };

  /*Constructor que importa el servicio de la DB en inicializa el objeto empleado */
  constructor(private employeeService: EmployeesService) {
    this.employeeDB = new Employee();
  }

  /*Suministra los empleados de la DB al cargar la aplicación*/
  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employeeArray = employees;
    })
  }

  /*metodo que direcciona a la DB */
  goToDB(){
    window.open(this.urlDB, '_blank');
  }

  /*Metodo invocar alerta generica*/
  callAlertError(){
    this.typeAlert = 'error';
      this.alert = true;
      setTimeout(() =>{
        this.alert = false
      },5000);
  }
  /*Evento Añadir Empleado*/
  async addEmployee() {
    /*Validaciones*/
    if(this.selectedEmployee.name == null || this.selectedEmployee.name == undefined || this.selectedEmployee.name === ''){
      this.callAlertError();
      return  
    }
    if(this.selectedEmployee.lastName == null || this.selectedEmployee.lastName == undefined || this.selectedEmployee.lastName === ''){
      this.callAlertError();
      return
    }
    if(this.selectedEmployee.phone == null || this.selectedEmployee.phone == undefined || this.selectedEmployee.phone === 0){
      this.callAlertError();
      return
    }
    if(this.selectedEmployee.address == null || this.selectedEmployee.address == undefined || this.selectedEmployee.address === ''){
      this.callAlertError();
      return
    }

    this.selectedEmployee.id = this.employeeArray.length + 1;

    /*gurada los datos registrados en el obejto del Empleado*/
    this.employeeDB = {
      id: this.selectedEmployee.id,
      name: this.selectedEmployee.name,
      lastName: this.selectedEmployee.lastName,
      phone: this.selectedEmployee.phone,
      address: this.selectedEmployee.address
    }
    await this.employeeService.addEmployee(this.employeeDB);
    this.typeAlert = 'add';
    this.alert = true;
    this.employeeArray.push(this.selectedEmployee);
    setTimeout(() =>{
      this.alert = false
    },5000);

    /*Limpiar el Formulario*/
    this.selectedEmployee = {
      name: '',
      lastName: '',
      phone: 0,
      address: '',
    };
  }

  /*selecciona el Empleado a editar*/
  edit(employee: Employee) {
    this.employeeEdit = true;
    this.selectedEmployee = employee;
  }
  /*Edita el empleado en DB*/
  editEmployee() {
    this.employeeDB = {
      id: this.selectedEmployee.id,
      name: this.selectedEmployee.name,
      lastName: this.selectedEmployee.lastName,
      phone: this.selectedEmployee.phone,
      address: this.selectedEmployee.address
    }
    this.employeeService.editEmployee(this.employeeDB);
    this.employeeEdit = false;
    this.typeAlert = 'edit';
    this.alert = true;
    setTimeout(() =>{
      this.alert = false
    },5000);

    this.selectedEmployee = {
      name: '',
      lastName: '',
      phone: 0,
      address: '',
    }
  }

  /*Eliminar Empleado*/
  async onClickDelete() {
    /*Envia el id a la DB para eliminarlo*/
    await this.employeeService.deleteEmployee(this.selectedEmployee.id);
    this.typeAlert = 'delete';
    this.alert = true;
    setTimeout(() =>{
      this.alert = false
    },5000);
    this.employeeEdit = false;

    this.selectedEmployee = {
      name: '',
      lastName: '',
      phone: 0,
      address: '',
    }
  }

  /*Switch de los estilos de las alertas*/
  getClassAlert() {
    switch (this.typeAlert) {
      case 'add':
        this.textAlert = 'Employee created Successfully'
        return 'alert alert-success';
      case 'edit':
        this.textAlert = 'Employee edited Successfully'
        return 'alert alert-warning';
      case 'delete':
        this.textAlert = 'Employee deleted Succesfully'
        return 'alert alert-danger';
      case 'error':
        this.textAlert = 'Field is not full'
        return 'alert alert-danger';
      default:
        return '';
    }
  }
}