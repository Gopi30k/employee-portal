from operator import add
from app.main import db
from app.main.model.effy_employee_portal import Company
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
