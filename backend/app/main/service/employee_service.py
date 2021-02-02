from operator import add
from app.main import db
from app.main.model.effy_employee_portal import Employee
import datetime


def create_employee(employee_data):
    print(Employee)
    new_employee = Employee(firstName=employee_data['firstName'],
                            lastName=employee_data['lastName'] if 'lastName' in employee_data else '',
                            email=employee_data['email'],
                            designation=employee_data['designation'],
                            DOB=datetime.datetime.strptime(
                                employee_data['DOB'], '%Y-%d-%m').strftime('%Y-%m-%d %H:%M:%S'),
                            active=employee_data['active'],
                            company_id=employee_data['company_id']
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


def save_to_database(data):  # TODO : remove and make it a comman service method
    try:
        db.session.add(data)
        db.session.commit()
        return True
    except Exception:
        return False
