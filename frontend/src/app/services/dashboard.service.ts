import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Employee, Address, Company } from "../models";
@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private employeeTableData: Subject<any> = new Subject<any>();
  employeeTableData$: Observable<any> = this.employeeTableData.asObservable();

  private companyTableData: Subject<any> = new Subject<any>();
  companyTableData$: Observable<any> = this.companyTableData.asObservable();

  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http
      .get<Employee>("http://127.0.0.1:5000/employee/")
      .pipe(catchError(this.handleError));
  }

  getAllEmployeesObs() {
    return this.http
      .get<Employee>("http://127.0.0.1:5000/employee/")
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.employeeTableData.next(data);
      });
  }

  getAllCompanies() {
    return this.http
      .get<Company>("http://127.0.0.1:5000/company/")
      .pipe(catchError(this.handleError));
  }

  getAllCompaniesObs() {
    return this.http
      .get<Company>("http://127.0.0.1:5000/company/")
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.companyTableData.next(data);
      });
  }

  addNewEmployee(employeeData: Employee) {
    return this.http
      .post("http://127.0.0.1:5000/employee/", employeeData)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(employeeId: number) {
    return this.http
      .delete(
        `http://localhost:5000/employee/${employeeId}
    `
      )
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee) {
    return this.http
      .put("http://localhost:5000/employee/", employee)
      .pipe(catchError(this.handleError));
  }

  addNewCompany(companyData: Company) {
    return this.http
      .post("http://127.0.0.1:5000/company/", companyData)
      .pipe(catchError(this.handleError));
  }

  deleteCompany(companyId: number) {
    return this.http
      .delete(
        `http://localhost:5000/company/${companyId}
    `
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    }
    // else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //       `body was: ${JSON.stringify(error.error)}`
    //   );
    // }
    // Return an observable with a user-facing error message.
    return throwError(error.error);
  }
}
