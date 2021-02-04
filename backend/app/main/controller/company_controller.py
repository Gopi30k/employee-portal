from flask import request
from flask_restx import Resource

from ..util.dto import CompanyDTO
from ..service.company_service import create_company, get_all_companies

api = CompanyDTO.api
_company = CompanyDTO.company


@api.route('/')
class ListCompany(Resource):
    @api.doc('list_of_all_companies')
    @api.marshal_list_with(_company)
    def get(self):
        """List all created Company"""
        return get_all_companies()

    @api.response(201, 'Company successfully added.')
    @api.doc('create a new Company')
    @api.expect(_company, validate=True)
    def post(self):
        """Creates a new Company """
        data = request.json
        return create_company(company_data=data)
