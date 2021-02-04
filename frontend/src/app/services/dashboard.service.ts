import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Employee, Address, Company } from "../models";
@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http
      .get<Employee>("http://127.0.0.1:5000/employee/")
      .pipe(catchError(this.handleError));
  }

  getAllCompanies() {
    return this.http
      .get<Company>("http://127.0.0.1:5000/company/")
      .pipe(catchError(this.handleError));
  }

  addNewEmployee(employeeData: Employee) {
    return this.http
      .post("http://127.0.0.1:5000/employee/", employeeData)
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
