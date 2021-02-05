import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
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
  toUdpate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    // this.dashboardService.getAllCompaniesObs();
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

    if ("data" in this.config) {
      this.toUdpate = true;
      let oldData = this.config.data;
      // console.log(oldData["company"][0]["name"]);

      this.newEmployeeForm.patchValue({
        firstName: oldData["firstName"],
        lastName: oldData["lastName"],
        email: oldData["email"],
        designation: oldData["designation"],
        // DOB: new Date(oldData["DOB"]).toString(),
        active: oldData["active"],
        // company: new FormControl(oldData["company"][0]["name"]),
      });
    }

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
    console.log(this.newEmployeeForm);

    if (this.newEmployeeForm.valid) {
      let employeeData = this.newEmployeeForm.value;
      employeeData.DOB = this.convertTo_YYYY_MM_DD(employeeData.DOB);
      if (!this.toUdpate) {
        employeeData.company = employeeData.company.cId;
        this.dashboardService.addNewEmployee(employeeData).subscribe(
          (data) => {
            console.log(data);
            this.dashboardService.getAllEmployeesObs();
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        employeeData.eId = this.config.data.eId;
        employeeData.company = employeeData.company.cId;
        console.log(employeeData);

        this.dashboardService.updateEmployee(employeeData).subscribe(
          (data) => {
            console.log(data);
            this.dashboardService.getAllEmployeesObs();
          },
          (err) => {
            console.error(err);
          }
        );
      }
      this.ref.close();
    }
  }
}
