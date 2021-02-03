import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyComponent } from "./company/company.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeeComponent } from "./employee/employee.component";

const routes: Routes = [
  {
    path: "effy",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: CompanyComponent,
        outlet: "company",
      },
      {
        path: "",
        component: EmployeeComponent,
        outlet: "employee",
      },
    ],
  },
  {
    path: "",
    redirectTo: "effy",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
