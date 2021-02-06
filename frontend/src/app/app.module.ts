import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CheckboxModule } from "primeng/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./style-libraries/material/angular.material.module";
import { PrimengModule } from "./style-libraries/primeng/primeng.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CompanyComponent } from "./company/company.component";
import { EmployeeComponent } from "./employee/employee.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NewEmployeeComponent } from "./new-employee/new-employee.component";
import { AgmCoreModule } from "@agm/core";
import { NewCompanyComponent } from "./new-company/new-company.component";
import { CompanyDetailviewComponent } from "./company-detailview/company-detailview.component";
import { EmployeePortalComponent } from "./employee-portal/employee-portal.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CompanyComponent,
    EmployeeComponent,
    NewEmployeeComponent,
    NewCompanyComponent,
    CompanyDetailviewComponent,
    EmployeePortalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CheckboxModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewEmployeeComponent, NewCompanyComponent],
})
export class AppModule {}
