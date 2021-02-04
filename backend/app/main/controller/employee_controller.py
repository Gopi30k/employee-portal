from flask import request
from flask_restx import Resource

from ..util.dto import EmployeeDTO
from ..service.employee_service import create_employee, get_all_employees

api = EmployeeDTO.api
_new_employee = EmployeeDTO.new_employee
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
