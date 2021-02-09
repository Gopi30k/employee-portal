from flask import request
from flask_restx import Resource

from ..util.dto import CompanyDTO
from ..service.company_service import create_company, get_all_companies, delete_company, update_company,  get_company_by_id

api = CompanyDTO.api
_new_company = CompanyDTO.new_company
_update_company = CompanyDTO.update_company
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

    @api.doc('Update an Company')
    @api.expect(_update_company, validate=True)
    def put(self):
        data = request.json
        return update_company(company=data)


@api.route('/<int:id>')
@api.response(204, 'Company deleted successfully')
class Company(Resource):
    @api.doc('Delete an company')
    def delete(self, id):
        return delete_company(id)

    @api.doc('get employees of company by id')
    @api.marshal_list_with(_update_company)
    def get(self, id):
        return get_company_by_id(id)
