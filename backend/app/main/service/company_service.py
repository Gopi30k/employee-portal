from operator import add
from app.main import db
from app.main.model.effy_employee_portal import Company, Employee, Address
from geopy.geocoders import Nominatim
from .address_service import create_address


def create_company(company_data):

    # Form Address string to pass to GeoPy
    address_as_string = """{doorNo} {street} {city} {pincode} {state} {country}""".format(
        doorNo=company_data['address']['doorNo'],
        street=company_data['address']['streetName'] if 'streetName' in company_data['address'] else '',
        city=company_data['address']['city'],
        state=company_data['address']['state'],
        country=company_data['address']['country'],
        pincode=company_data['address']['pincode']
    )

    # Get latlong from address
    latLong = getLatLong(address_string=address_as_string)
    if (latLong):
        company_data['latitude'], company_data['longitude'] = latLong
        new_company = Company(
            name=company_data['name'], latitude=company_data['latitude'], longitude=company_data['longitude'])
        save_to_database(new_company)
        new_company_id = new_company.cId
        if new_company_id is not None:
            company_data['address']['company_id'] = new_company_id
            create_address(address_data=company_data['address'])
        else:  # TODO:custom Exception
            return {
                'status': 'failed',
                'message': 'New Company cannot be added,Try again later'
            }, 400

    else:  # TODO:custom Exception
        return {
            'status': 'failed',
            'message': 'LatLong fetch from address failed'
        }, 400

    return {
        'status': 'success',
        'message': 'Company successfully added.'
    }


def address_as_string(address):
    return """{doorNo} {street} {city} {pincode} {state} {country}""".format(
        doorNo=address['doorNo'],
        street=address['streetName'] if 'streetName' in address else '',
        city=address['city'],
        state=address['state'],
        country=address['country'],
        pincode=address['pincode']
    )


def getLatLong(address_string):
    # Fetch Latitude and longitude from GeoPy
    try:
        geolocator = Nominatim(
            user_agent="gopikrish3004@gmail.com")  # may be changed
        location = geolocator.geocode(address_string)
        return (location.latitude, location.longitude) if location is not None else (0, 0)
    except Exception:
        return False


def get_all_companies():
    return Company.query.all()


def save_to_database(data):  # TODO : remove and make it a comman service method
    try:
        db.session.add(data)
        db.session.commit()
        return True
    except Exception:
        return False


def delete_company(companyId):
    try:
        # change employees company id to null
        employees = Employee.query.filter_by(company_id=companyId).all()
        if(len(employees) > 0):
            for employee in employees:
                employee.company_id = None
            db.session.commit()
        company = Company.query.filter_by(cId=companyId)

        if(bool(company.first())):
            company.delete()
            db.session.commit()
            return {
                'message': """Company deleted successfully"""
            }, 204

        else:
            return {
                'message': """Company not found"""
            }, 404

    except Exception as e:
        print(e)
        return {
            'message': """Error when deleting company"""
        }, 400


def update_company(company):
    # breakpoint()
    companyUpdate = Company.query.filter_by(cId=company['cId'])
    Address.query.filter_by(company_id=company['cId']).update(dict(doorNo=company['address']['doorNo'],
                                                                   streetName=company['address']['streetName'],
                                                                   city=company['address']['city'],
                                                                   state=company['address']['state'],
                                                                   country=company['address']['country'],
                                                                   pincode=company['address']['pincode'],
                                                                   ))
    address_string = address_as_string(address=company['address'])
    # Get latlong from address
    latLong = getLatLong(address_string=address_string)
    if (latLong):
        company['latitude'], company['longitude'] = latLong
        companyUpdate.update(dict(
            name=company['name'], latitude=company['latitude'], longitude=company['longitude']))
        db.session.commit()
        return {
            'message': 'Company updated'
        }, 200

    else:  # TODO:custom Exception
        return {
            'message': 'LatLong fetch from address failed'
        }, 400


def get_company_by_id(id):
    return Company.query.filter(Company.cId == id).all()
