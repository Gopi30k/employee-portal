import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../services/dashboard.service";
import { Column, Employee } from "../models";
import { DialogService } from "primeng/dynamicdialog";
import { NewEmployeeComponent } from "../new-employee/new-employee.component";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
  providers: [DialogService],
})
export class EmployeeComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    public dialogService: DialogService
  ) {}

  employees: Employee;
  columns: Column[];
  newEmployeeDialog: boolean = false;
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

    this.dashboardService.getAllEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  show() {
    const ref = this.dialogService.open(NewEmployeeComponent, {
      header: "Add New Employee",
      width: "60%",
    });
  }
}
