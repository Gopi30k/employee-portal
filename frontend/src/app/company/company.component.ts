import { Component, OnDestroy, OnInit } from "@angular/core";
import { DashboardService } from "../services/dashboard.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Observable } from "rxjs";
import { Company } from "../models";
import { MenuItem } from "primeng/api";
import { NewCompanyComponent } from "../new-company/new-company.component";
@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
  providers: [DialogService],
})
export class CompanyComponent implements OnInit, OnDestroy {
  companies: Observable<Company>;
  rowActions: MenuItem[];
  ref: DynamicDialogRef;
  rowSelected: Company;
  displayMapModal: boolean = false;
  latitude: number;
  longitude: number;
  options: any;
  constructor(
    private dashboardService: DashboardService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.dashboardService.getAllCompaniesObs();
    this.companies = this.dashboardService.companyTableData$;

    this.rowActions = [
      {
        label: "Update",
        icon: "pi pi-pencil",
        command: (event) => this.updateCompanyRow(this.rowSelected),
      },
      {
        label: "Delete",
        icon: "pi pi-times",
        command: (event) => this.deleteCompanyRow(this.rowSelected),
      },
    ];
  }

  show() {
    this.ref = this.dialogService.open(NewCompanyComponent, {
      header: "Add New Employee",
      width: "60%",
    });
  }

  updateCompanyRow(company: Company) {
    console.log(company);
    // this.ref = this.dialogService.open(NewCompanyComponent, {
    //   data: employee,
    //   header: "Add New Employee",
    //   width: "60%",
    // });
  }

  deleteCompanyRow(company: Company) {
    console.log(company);
    this.dashboardService
      .deleteCompany(+company.cId)
      .subscribe((response: Response) => {
        this.dashboardService.getAllCompaniesObs();
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

  showmap(company: Company) {
    this.displayMapModal = !this.displayMapModal;
    this.latitude = +company.latitude;
    this.longitude = +company.longitude;
  }
  ngOnDestroy() {
    this.ref.close();
  }
}
