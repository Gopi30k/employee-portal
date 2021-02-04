from typing import List
from flask_restx import Namespace, fields
import datetime


class AddressDTO:
    api = Namespace('address', description='Endpoint to manage Address')
    address = api.model('address', {
        'aId': fields.Integer(required=True, description='Id of Address'),
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
        'cId': fields.Integer(required=True, description='Id of the company'),
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
    new_employee = api.model('new_employee',
                             {
                                 'firstName': fields.String(required=True, description='First Name of employee'),
                                 'lastName': fields.String(required=False, description='Last Name of employee'),
                                 'email': fields.String(required=True, description='Email ID of employee'),
                                 'designation': fields.String(required=False, description='Designation of employee'),
                                 'DOB': fields.Date(required=True, description='Date of Birth of employee'),
                                 'active': fields.Boolean(required=True, description='Active state of employee'),
                                 'company': fields.Integer(required=True, description='Company ID where an employee is working'),

                             })

    employees = api.model('employees',
                          {
                              'eId': fields.Integer(required=True, description='Id of employee'),
                              'firstName': fields.String(required=True, description='First Name of employee'),
                              'lastName': fields.String(required=False, description='Last Name of employee'),
                              'email': fields.String(required=True, description='Email ID of employee'),
                              'designation': fields.String(required=False, description='Designation of employee'),
                              'DOB': fields.Date(required=True, description='Date of Birth of employee'),
                              'active': fields.Boolean(required=True, description='Active state of employee'),
                              'company': fields.List(fields.Nested(api.model('employee',
                                                                             {
                                                                                 'cId': fields.Integer(required=True, description='Id of the company'),
                                                                                 'name': fields.String(required=True, description='Name of the Company'),
                                                                                 'address': fields.List(fields.Nested(api.model('address',
                                                                                                                                {'aId': fields.Integer(required=True, description='Id of Address'),
                                                                                                                                 'doorNo': fields.String(required=True),
                                                                                                                                 'streetName': fields.String(required=False),
                                                                                                                                 'city': fields.String(required=True),
                                                                                                                                 'state': fields.String(required=True),
                                                                                                                                 'country': fields.String(required=True),
                                                                                                                                 'pincode': fields.String(required=True),
                                                                                                                                 }), required=True)),
                                                                                 'latitude': fields.String(required=False, description='Latitude of company location'),
                                                                                 'longitude': fields.String(required=False, description='Longitude of company location')
                                                                             })))
                              #   'company': fields.String()
                          })
