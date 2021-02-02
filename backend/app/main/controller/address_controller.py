from flask import request
from flask_restx import Resource

from ..util.dto import AddressDTO
from ..service.address_service import create_address, get_all_address

api = AddressDTO.api
_address = AddressDTO.address


@api.route('/')
class ListAddress(Resource):
    @api.doc('list_of_all_address')
    @api.marshal_list_with(_address, envelope='address')
    def get(self):
        """List all created Address"""
        return get_all_address()

    @api.response(201, 'Address successfully added.')
    @api.doc('create a new Address')
    @api.expect(_address, validate=True)
    def post(self):
        """Creates a new Address """
        data = request.json
        return create_address(address_data=data)
