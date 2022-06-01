import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../modules/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private firestore: Firestore) { }

  getEmployees(): Observable<Employee[]> {
    const employeeRef = collection(this.firestore, 'employees');
    return collectionData(employeeRef, { idField: 'id' }) as Observable<Employee[]>
  }

  addEmployee(employee: Employee) {
    const employeeRef = collection(this.firestore, 'employees');
    return addDoc(employeeRef, employee);
  }

  async editEmployee(employee: Employee) {
    console.log(employee);
    const employeeRef = doc(this.firestore, 'employees', `${employee.id}`);
    /*actualiza el Empleado*/
    await updateDoc(employeeRef, {
      name: employee.name,
      lastName: employee.lastName,
      phone: employee.phone,
      address: employee.address
    });
  }

  deleteEmployee(employee: string) {
    const employeeDocRef = doc(this.firestore, `employees/${employee}`);
    return deleteDoc(employeeDocRef);
  }

}