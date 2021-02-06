import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Company, companyDropDownList } from "../models";
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
  listOfCompanies: companyDropDownList[];
  toUdpate: boolean = false;
  isCompanydetailViewPage: boolean = false;
  companyNamefromDetailViewPage: string;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    // *Get List of companies for company dropdown
    this.dashboardService.getAllCompanies().subscribe((data) => {
      this.listOfCompanies = [];
      data.forEach((element) => {
        // *Pushing only CId and Name of company into the list
        this.listOfCompanies.push({ cId: element.cId, name: element.name });
      });
    });

    // *FormBuilder - creates the Employee Form
    this.newEmployeeForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      email: ["", [Validators.required, Validators.email]],
      designation: ["", Validators.required],
      DOB: ["", Validators.required],
      active: [true],
      company: ["", Validators.required],
    });

    // *Check for update view selected or company Details view selected

    if ("data" in this.config) {
      // *Data to prepopulate the form
      let predefinedConfigData = this.config.data;

      // *checking if data is coming from Company Detail Page or update Context Menu
      if ("companyDetailViewData" in predefinedConfigData) {
        this.isCompanydetailViewPage = true;
        // console.log(predefinedConfigData);
        // *removing company field to make the field as disabled
        this.newEmployeeForm.removeControl("company");
        this.companyNamefromDetailViewPage =
          predefinedConfigData.companyDetailViewData.name;
      } else {
        this.toUdpate = true;
        // *PrePopulate Employee Form with old Data on Update Context Menu
        this.newEmployeeForm.patchValue({
          firstName: predefinedConfigData["firstName"],
          lastName: predefinedConfigData["lastName"],
          email: predefinedConfigData["email"],
          designation: predefinedConfigData["designation"],
          DOB: new Date(predefinedConfigData["DOB"]),
          active: predefinedConfigData["active"],
          company: {
            cId: predefinedConfigData["company"][0]["cId"],
            name: predefinedConfigData["company"][0]["name"],
          },
        });
      }
    }
    // console.log(this.newEmployeeForm);

    this.yearString = `1900:${new Date().getFullYear()}`;
  }

  get employeeFormControl() {
    return this.newEmployeeForm.controls;
  }

  // *Convert Date to YYYY/MM/DD to pass to API
  convertTo_YYYY_MM_DD(date: string): string {
    const fDate = new Date(date);
    return `${fDate.getFullYear()}-${fDate.getMonth() + 1}-${fDate.getDate()}`;
  }

  addNewEmployee() {
    this.submitted = true;
    // console.log(this.newEmployeeForm);

    if (this.newEmployeeForm.valid) {
      let employeeData = this.newEmployeeForm.value;

      // *Add Company data to employee Form data for detail view Page since its been removed before
      if (this.isCompanydetailViewPage) {
        employeeData.company = this.config.data.companyDetailViewData;
      }
      // console.log(employeeData);
      employeeData.DOB = this.convertTo_YYYY_MM_DD(employeeData.DOB);
      if (!this.toUdpate) {
        employeeData.company = employeeData.company.cId;
        this.dashboardService.addNewEmployee(employeeData).subscribe(
          (data) => {
            // * API call to refresh data on new record Addition
            this.isCompanydetailViewPage
              ? this.dashboardService.getEmployeesofCompany(
                  this.config.data.companyDetailViewData.cId
                )
              : this.dashboardService.getAllEmployeesObs();
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        employeeData.eId = this.config.data.eId;
        employeeData.company = employeeData.company.cId;

        // * API call to refresh data on update record
        this.dashboardService.updateEmployee(employeeData).subscribe(
          (data) => {
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
