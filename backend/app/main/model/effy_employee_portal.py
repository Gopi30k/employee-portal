from .. import db


class Company(db.Model):
    """ Company Model for storing company related details """
    __tablename__ = "Company"

    cId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    address = db.relationship(
        'Address', backref='company', cascade="all,delete",)
    latitude = db.Column(db.Numeric(precision=9, scale=6), nullable=False)
    longitude = db.Column(db.Numeric(
        precision=9, scale=6), nullable=False)
    employee = db.relationship(
        'Employee', backref='company', passive_deletes=True)

    def __repr__(self):
        return "<Company '{}'>".format(self.cId)


class Address(db.Model):
    """ Address Model for storing Address of Companies/Employees """
    __tablename__ = "Address"

    aId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    doorNo = db.Column(db.String(10), nullable=True)
    streetName = db.Column(db.String(50), nullable=True)
    city = db.Column(db.String(45), nullable=False)
    state = db.Column(db.String(45), nullable=False)
    country = db.Column(db.String(45), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(
        'Company.cId', ondelete='CASCADE'), nullable=True)

    def __str__(self):
        return """{doorNo} {street} {city} {pincode} {state} {country}""".format(
            doorNo=self.doorNo, street=self.streetName, city=self.city, state=self.state, country=self.country, pincode=self.pincode)

    # def __repr__(self):
    #     return "<Address '{}'>".format(self.aId)


class Employee(db.Model):
    """ Employee Model for storing employee details """
    __tablename__ = "Employee"

    eId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstName = db.Column(db.String(45), nullable=False)
    lastName = db.Column(db.String(45), nullable=True)
    email = db.Column(db.String(50), nullable=False)
    designation = db.Column(db.String(45), nullable=True)
    DOB = db.Column(db.Date, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('Company.cId', ondelete='CASCADE'),
                           nullable=True)

    def __repr__(self):
        return "<Employee '{}'>".format(self.eId)
