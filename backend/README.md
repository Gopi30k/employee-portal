# Backend REST API using Flask

## Steps to setup local development environment

### Dependencies

```
Python 3.6+ is needed
```

### Installation

1.) Clone the Git repository in your local machine

```
git clone https://github.com/Gopi30k/employee-portal.git
```

2.) Move/Navigate to the backend directory

```
cd employee-portal/backend
```

3.) Use Python venv to create a virtual environment

```
python -m venv env
```

4.) Activate Virtual Environment

#### Windows

```
./env/Scripts/Activate
```

#### Linux/MacOS

```
source env/bin/activate
```

5.) Use the package manager [pip](https://pip.pypa.io/en/stable/) to install requirements.

```bash
pip install -r requirements.txt
```

6.) Enter MYSQL Database server details in .env file.

7.) Database Migration Steps 

```bash
 python manage.py db init
 python manage.py db migrate --message 'initial Db migation'
 python manage.py db upgrade
```

8.)  Run the Flask server

```bash
python manage.py run
```

9.) Server started 

```bash
http://127.0.0.1:5000
```

For more :
[visit](https://flask-migrate.readthedocs.io/en/latest/)

10.) Database Models Testing via Shell

```bash
from app.main import create_app, db
from app.main.model.effy_employee_portal import Employee,Company
import datetime
app = create_app('dev')
app.app_context().push()
db.create_all(app=create_app('dev'))
db.session.add(effy_employee_portal.Company(name='abc',latitude=12.3434,longitude=23.343423))
db.session.add(effy_employee_portal.Address(doorNo='1',streetName="Test street",city="chennai", state="Tamil Nadu", country="India", pincode="600053",company_id=1))
db.session.add(effy_employee_portal.Employee(firstName='Gopi',lastName="Krishnan",email="gopi@gmail.com", designation="Full stack Developer", DOB=datetime.datetime.strptime('1996-30-04', '%Y-%d-%m').strftime('%Y-%m-%d %H:%M:%S'), active=True,company_id=1))
db.session.commit()

// Get Company name and city of employee Gopi
select emp.firstName,com.name,ad.city from employee emp join company com join address ad where emp.firstName = "Gopi";

```

## Testing - Unit Test

1.) Move/Navigate to tests folder from root folder in a new Terminal

```bash
cd tests
```

2.) Run the Unit Test

```bash
python -m unittest test_payment.py
```
