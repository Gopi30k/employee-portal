from flask_restx import Namespace, fields


class AddressDTO:
    api = Namespace('address', description='Endpoint to manage Address')
    address = api.model('address', {
        'doorNo': fields.String(required=True, description='DoorNo/FlatNo of address'),
        'streetName': fields.String(required=False, description='Street Name of address'),
        'city': fields.String(required=True, description='City of address'),
        'state': fields.String(required=True, description='State of address'),
        'country': fields.String(required=True, description='Country of address'),
        'pincode': fields.String(required=True, description='Pincode of address'),
        'company_id': fields.Integer(required=True, description='Company ID releated to address'),
    })


class CompanyDTO:

    api = Namespace('company', description='Endpoint to manage Company')

    company = api.model('company', {
        'name': fields.String(required=True, description='Name of the Company'),
        'address': fields.Nested(api.model('address',
                                           {
                                               'doorNo': fields.String(required=True),
                                               'streetName': fields.String(required=False),
                                               'city': fields.String(required=True),
                                               'state': fields.String(required=True),
                                               'country': fields.String(required=True),
                                               'pincode': fields.String(required=True),
                                           }), required=True),
        'latitude': fields.String(required=False, description='Latitude of company location'),
        'longitude': fields.String(required=False, description='Longitude of company location')
    })


class EmployeeDTO:
    api = Namespace('employee', description='Endpoint to manage Employee')
    employee = api.model('employee',
                         {
                             'firstName': fields.String(required=True, description='First Name of employee'),
                             'lastName': fields.String(required=False, description='Last Name of employee'),
                             'email': fields.String(required=True, description='Email ID of employee'),
                             'designation': fields.String(required=False, description='Designation of employee'),
                             'DOB': fields.DateTime(required=True, description='Date of Birth of employee'),
                             'active': fields.Boolean(required=True, description='Active state of employee'),
                             'company_id': fields.Integer(required=True, description='Company ID where an employee is working'),

                         })
