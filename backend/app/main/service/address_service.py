from operator import add
from app.main import db
from app.main.model.effy_employee_portal import Address


def create_address(address_data):
    if address_data:
        new_address = Address(doorNo=address_data['doorNo'],
                              streetName=address_data['streetName'],
                              city=address_data['city'],
                              state=address_data['state'],
                              country=address_data['country'],
                              pincode=address_data['pincode'],
                              company_id=address_data['company_id']
                              )
        if(save_to_database(new_address)):
            return {
                'status': 'success',
                'message': 'Address successfully added'
            }
        else:
            return{
                'status': 'failed',
                'message': 'Database Error while adding new address'
            }, 400


def get_all_address():
    return Address.query.all()


def save_to_database(data):  # TODO : remove and make it a comman service method
    try:
        db.session.add(data)
        db.session.commit()
        return True
    except Exception:
        return False
