import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiParentDept, IApiResponse, IChildDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  isFormVisible = signal<boolean>(false);
  masterSrv = inject(MasterService);
  parentDeptList = signal<IApiParentDept[]>([]);
  employeeList = signal<Employee[]>([]);
  childDeptList = signal<IChildDept[]>([]);
  parentDeptId: number = 0;
  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getPerantDept();
    this.getEmployees();
  }

  getPerantDept(){
    this.masterSrv.getAllDept().subscribe((res:IApiResponse)=>{
      this.parentDeptList.set(res.data);
    });
  }

  getEmployees(){
    this.masterSrv.getAllEmployee().subscribe((res:Employee[])=>{
      this.employeeList.set(res);
    })
  }
  onPerantDeptChange(){
    this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((Res:IApiResponse)=>{
      this.childDeptList.set(Res.data)
    });
  }

  onSave(){
    debugger;
    this.masterSrv.saveEmp(this.employeeObj).subscribe((res:IApiResponse)=>{
      debugger;
      alert("Employee Created");
    },error=>{

    })
  }

  onEdit(){

  }

  onDelete(){
    
  }

}
