import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { combineAll } from "rxjs/operators";
import { AppComponent } from "./app.component";
import { CompanyDetailviewComponent } from "./company-detailview/company-detailview.component";
import { CompanyComponent } from "./company/company.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeePortalComponent } from "./employee-portal/employee-portal.component";
import { EmployeeComponent } from "./employee/employee.component";

const routes: Routes = [
  {
    path: "effy",
    component: EmployeePortalComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
        children: [
          {
            path: "",
            component: EmployeeComponent,
            outlet: "employee",
          },
          {
            path: "",
            component: CompanyComponent,
            outlet: "company",
          },
        ],
      },
      {
        path: "detail/:id",
        component: CompanyDetailviewComponent,
      },
    ],
  },

  {
    path: "",
    redirectTo: "effy",
    pathMatch: "full",
  },

  { path: "**", redirectTo: "effy", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
