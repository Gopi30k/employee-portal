from flask_restx import Api
from flask import Blueprint

from .main.controller.address_controller import api as address_ns
from .main.controller.company_controller import api as company_ns
from .main.controller.employee_controller import api as employee_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='Effy Employee Portal API',
          version='1.0',
          description='Manage all your employee and company details easily'
          )

# api.add_namespace(address_ns, path='/address')
api.add_namespace(company_ns, path='/company')
api.add_namespace(employee_ns, path='/employee')
