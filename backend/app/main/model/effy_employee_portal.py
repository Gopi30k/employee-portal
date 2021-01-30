from .. import db


class Company(db.Model):
    """ Company Model for storing company related details """
    __tablename__ = "Company"

    cId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    address = db.relationship('Address', backref='company', lazy=True)
    latitude = db.Column(db.Numeric(precision=9, scale=6), nullable=False)
    longitude = db.Column(db.Numeric(
        precision=9, scale=6), nullable=False)

    def __repr__(self):
        return "<Company '{}'>".format(self.cId)


class Address(db.Model):
    """ Address Model for storing Address of Companies/Employees """
    __tablename__ = "Address"

    aId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    doorNo = db.Column(db.String(10), nullable=False)
    streetName = db.Column(db.String(50), nullable=True)
    city = db.Column(db.String(45), nullable=False)
    state = db.Column(db.String(45), nullable=False)
    country = db.Column(db.String(45), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('Company.cId'),
                           nullable=False)

    def __repr__(self):
        return "<Address '{}'>".format(self.aId)
