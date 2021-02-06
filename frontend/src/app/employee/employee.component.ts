import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { DashboardService } from "../services/dashboard.service";
import { Column, Employee } from "../models";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { NewEmployeeComponent } from "../new-employee/new-employee.component";
import { Observable } from "rxjs";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
  providers: [DialogService],
})
export class EmployeeComponent implements OnInit, OnDestroy {
  constructor(
    private dashboardService: DashboardService,
    public dialogService: DialogService
  ) {}

  employees: Observable<Employee>;
  columns: Column[];
  newEmployeeDialog: boolean = false;
  ref: DynamicDialogRef;
  rowActions: MenuItem[];
  rowSelected: Employee;
  ngOnInit() {
    this.columns = [
      { field: "firstName", header: "FirstName" },
      { field: "lastName", header: "LastName" },
      { field: "email", header: "Email" },
      { field: "designation", header: "Designation" },
      { field: "DOB", header: "DOB" },
      { field: "active", header: "Active" },
      { field: "company", header: "Company" },
    ];

    this.dashboardService.getAllEmployeesObs();
    this.employees = this.dashboardService.employeeTableData$;

    this.rowActions = [
      {
        label: "Update",
        icon: "pi pi-pencil",
        command: (event) => this.updateEmployeeRow(this.rowSelected),
      },
      {
        label: "Delete",
        icon: "pi pi-times",
        command: (event) => this.deleteEmployeeRow(this.rowSelected),
      },
    ];
  }

  show() {
    this.ref = this.dialogService.open(NewEmployeeComponent, {
      header: "Add New Employee",
      width: "70%",
    });
  }

  updateEmployeeRow(employee: Employee) {
    console.log(employee);
    this.ref = this.dialogService.open(NewEmployeeComponent, {
      data: employee,
      header: "Add New Employee",
      width: "70%",
    });
  }

  deleteEmployeeRow(employee: Employee) {
    console.log(employee.eId);
    this.dashboardService
      .deleteEmployee(+employee.eId)
      .subscribe((response: Response) => {
        this.dashboardService.getAllEmployeesObs();
      });
    // let index = -1;
    // for (let i = 0; i < this.cars.length; i++) {
    //     if (this.cars[i].vin == car.vin) {
    //         index = i;
    //         break;
    //     }
    // }
    // this.cars.splice(index, 1);

    // this.messageService.add({ severity: 'info', summary: 'Car Deleted', detail: car.vin + ' - ' + car.brand });
  }

  ngOnDestroy() {
    if (this.ref !== undefined) {
      this.ref.close();
    }
  }
}
