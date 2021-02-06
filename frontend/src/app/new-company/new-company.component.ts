import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DashboardService } from "../services/dashboard.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Company } from "../models";
@Component({
  selector: "app-new-company",
  templateUrl: "./new-company.component.html",
  styleUrls: ["./new-company.component.scss"],
})
export class NewCompanyComponent implements OnInit {
  newCompanyForm: FormGroup;
  submitted: boolean = false;
  toUdpate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.newCompanyForm = this.fb.group({
      name: ["", Validators.required],
      address: this.fb.group({
        doorNo: [""],
        streetName: ["", Validators.required],
        city: ["", Validators.required],
        state: ["", Validators.required],
        country: ["", Validators.required],
        pincode: ["", Validators.required],
      }),
    });

    if ("data" in this.config) {
      this.toUdpate = true;
      let oldData = this.config.data;
      console.log();

      this.newCompanyForm.patchValue({
        name: oldData["name"],
        address: {
          doorNo: oldData["address"][0]["doorNo"],
          streetName: oldData["address"][0]["streetName"],
          city: oldData["address"][0]["city"],
          state: oldData["address"][0]["state"],
          country: oldData["address"][0]["country"],
          pincode: oldData["address"][0]["pincode"],
        },
      });
    }

    console.log(this.newCompanyForm);
  }

  get companyFormControl() {
    return this.newCompanyForm.controls;
  }

  addNewCompany() {
    this.submitted = true;
    if (this.newCompanyForm.valid) {
      let companyData = this.newCompanyForm.value;
      if (!this.toUdpate) {
        this.dashboardService.addNewCompany(companyData).subscribe(
          (data) => {
            this.dashboardService.getAllCompaniesObs();
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        companyData.cId = this.config.data.cId;
        console.log(companyData);

        this.dashboardService.updateCompany(companyData).subscribe(
          (data) => {
            this.dashboardService.getAllCompaniesObs();
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
