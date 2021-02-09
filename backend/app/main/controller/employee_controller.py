from flask import request
from flask_restx import Resource

from ..util.dto import EmployeeDTO
from ..service.employee_service import create_employee, get_all_employees, delete_employee, update_employee, get_employees_of_company

api = EmployeeDTO.api
_new_employee = EmployeeDTO.new_employee
_update_employee = EmployeeDTO.update_employee
_employees = EmployeeDTO.employees


@api.route('/')
class ListEmployees(Resource):
    @api.doc('list_of_all_employees')
    @api.marshal_list_with(_employees)
    def get(self):
        """List all created Employee"""
        return get_all_employees()

    @api.response(201, 'Employee successfully added.')
    @api.doc('create a new Employee')
    @api.expect(_new_employee, validate=True)
    def post(self):
        """Creates a new Employee """
        data = request.json
        return create_employee(employee_data=data)

    @api.doc('Update an Employee')
    @api.expect(_update_employee, validate=True)
    def put(self):
        data = request.json
        return update_employee(employee=data)


@api.route('/<int:id>')
@api.response(204, 'Employee deleted successfully')
class Employee(Resource):
    @api.doc('Delete an employee')
    def delete(self, id):
        return delete_employee(id)

    @api.doc('get employees of company by id')
    @api.marshal_list_with(_employees)
    def get(Self, id):
        return get_employees_of_company(id)
