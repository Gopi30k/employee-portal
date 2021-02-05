from flask import request
from flask_restx import Resource

from ..util.dto import CompanyDTO
from ..service.company_service import create_company, get_all_companies, delete_company

api = CompanyDTO.api
_new_company = CompanyDTO.new_company
_companies = CompanyDTO.company


@api.route('/')
class ListCompany(Resource):
    @api.doc('list_of_all_companies')
    @api.marshal_list_with(_companies)
    def get(self):
        """List all created Company"""
        return get_all_companies()

    @api.response(201, 'Company successfully added.')
    @api.doc('create a new Company')
    @api.expect(_new_company, validate=True)
    def post(self):
        """Creates a new Company """
        data = request.json
        return create_company(company_data=data)


@api.route('/<int:id>')
@api.response(204, 'Company deleted successfully')
class Company(Resource):
    @api.doc('Delete an company')
    def delete(self, id):
        return delete_company(id)
