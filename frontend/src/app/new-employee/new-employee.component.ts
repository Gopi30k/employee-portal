import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Company } from "../models";
import { DashboardService } from "../services/dashboard.service";

@Component({
  selector: "app-new-employee",
  templateUrl: "./new-employee.component.html",
  styleUrls: ["./new-employee.component.scss"],
})
export class NewEmployeeComponent implements OnInit {
  newEmployeeForm: FormGroup;
  submitted: boolean = false;
  yearString: string;
  listOfCompanies: Company;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardService.getAllCompanies().subscribe((data) => {
      this.listOfCompanies = data;
    });

    this.newEmployeeForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.email],
      designation: ["", Validators.required],
      DOB: ["", Validators.required],
      active: [true],
      company: ["", Validators.required],
    });

    this.yearString = `1900:${new Date().getFullYear()}`;
  }

  get employeeFormControl() {
    return this.newEmployeeForm.controls;
  }

  convertTo_YYYY_MM_DD(date: string): string {
    const fDate = new Date(date);
    return `${fDate.getFullYear()}-${fDate.getMonth() + 1}-${fDate.getDate()}`;
  }

  addNewEmployee() {
    this.submitted = true;
    if (this.newEmployeeForm.valid) {
      let employeeData = this.newEmployeeForm.value;
      employeeData.DOB = this.convertTo_YYYY_MM_DD(employeeData.DOB);
      employeeData.company = employeeData.company.cId;
      console.log(employeeData);

      this.dashboardService.addNewEmployee(employeeData).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
