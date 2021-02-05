from operator import add
from app.main import db
from app.main.model.effy_employee_portal import Employee, Company
import datetime


def create_employee(employee_data):
    new_employee = Employee(firstName=employee_data['firstName'],
                            lastName=employee_data['lastName'] if 'lastName' in employee_data else '',
                            email=employee_data['email'],
                            designation=employee_data['designation'],
                            DOB=datetime.datetime.strptime(
                                employee_data['DOB'], '%Y-%m-%d').strftime('%Y-%m-%d'),
                            active=employee_data['active'],
                            company_id=employee_data['company']
                            )
    if(save_to_database(new_employee)):
        return {
            'message': 'Employee successfully added'
        }
    else:
        return{
            'status': 'failed',
            'message': 'Database Error while adding new employee'
        }, 400


def get_all_employees():
    return Employee.query.all()
    # x = db.session.query(Employee, Company).join(Company).with_entities(
    #     Employee.firstName, Employee.lastName, Employee.email, Employee.designation, Employee.DOB, Employee.active, Company.name).all()
    # print(x)
    # return x


def save_to_database(data):  # TODO : remove and make it a comman service method
    try:
        db.session.add(data)
        db.session.commit()
        return True
    except Exception:
        return False


def delete_employee(employeeId):
    try:
        employee = Employee.query.filter_by(eId=employeeId)

        if(bool(employee.first())):
            employee.delete()
            db.session.commit()
            return {
                'message': """Employee deleted successfully"""
            }, 204

        else:
            return {
                'message': """Employee not found"""
            }, 404

    except Exception as e:
        print(e)
        return {
            'message': """Error when deleting employee"""
        }, 400


def update_employee(employee):
    Employee.query.filter_by(eId=employee['eId']).update(dict(firstName=employee['firstName'],
                                                              lastName=employee['lastName'],
                                                              email=employee['email'],
                                                              designation=employee['designation'],
                                                              DOB=employee['DOB'],
                                                              active=employee['active'],
                                                              company_id=employee['company']
                                                              ))
    db.session.commit()
    return True
