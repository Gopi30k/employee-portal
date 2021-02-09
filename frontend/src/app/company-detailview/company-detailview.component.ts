import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Company, Employee } from "../models";
import { DashboardService } from "../services/dashboard.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { NewEmployeeComponent } from "../new-employee/new-employee.component";

@Component({
  selector: "app-company-detailview",
  templateUrl: "./company-detailview.component.html",
  styleUrls: ["./company-detailview.component.scss"],
  providers: [DialogService],
})
export class CompanyDetailviewComponent implements OnInit {
  employeesOfCompany: Observable<Employee>;
  companyData;
  displayMapModal: boolean = false;
  ref: DynamicDialogRef;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    // this.companyData = history.state.data;
    // console.log(this.companyData);

    this.route.paramMap.subscribe((params) => {
      const id = +params.get("id");
      this.dashboardService.getCompanyById(id).subscribe((data) => {
        console.log(data);

        this.companyData = data[0];
      });
      this.dashboardService.getEmployeesofCompany(id);
      this.employeesOfCompany = this.dashboardService.employeesOfCompany$;
      // this.dashboardService.getEmployeesofCompany(id).subscribe(
      //   (data) => {
      //     console.log(data);

      //     this.employeesOfCompany = data;
      //   },
      //   (err) => {
      //     console.error(err);
      //   }
      // );
    });
  }

  show() {
    this.ref = this.dialogService.open(NewEmployeeComponent, {
      data: {
        companyDetailViewData: {
          cId: this.companyData.cId,
          name: this.companyData.name,
        },
      },
      header: "Add New Employee",
      width: "70%",
    });
  }

  onEmployeeDelete(employeeId) {
    this.dashboardService
      .deleteEmployee(+employeeId)
      .subscribe((response: Response) => {
        this.dashboardService.getEmployeesofCompany(this.companyData.cId);
      });
  }
}
