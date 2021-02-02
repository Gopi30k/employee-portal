"""initial Db migation

Revision ID: 084569945479
Revises: 
Create Date: 2021-02-01 12:49:03.793193

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '084569945479'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Company',
    sa.Column('cId', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=45), nullable=False),
    sa.Column('latitude', sa.Numeric(precision=9, scale=6), nullable=False),
    sa.Column('longitude', sa.Numeric(precision=9, scale=6), nullable=False),
    sa.PrimaryKeyConstraint('cId')
    )
    op.create_table('Address',
    sa.Column('aId', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('doorNo', sa.String(length=10), nullable=False),
    sa.Column('streetName', sa.String(length=50), nullable=True),
    sa.Column('city', sa.String(length=45), nullable=False),
    sa.Column('state', sa.String(length=45), nullable=False),
    sa.Column('country', sa.String(length=45), nullable=False),
    sa.Column('pincode', sa.String(length=10), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['Company.cId'], ),
    sa.PrimaryKeyConstraint('aId')
    )
    op.create_table('Employee',
    sa.Column('eId', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('firstName', sa.String(length=45), nullable=False),
    sa.Column('lastName', sa.String(length=45), nullable=True),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('designation', sa.String(length=45), nullable=True),
    sa.Column('DOB', sa.DateTime(), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['Company.cId'], ),
    sa.PrimaryKeyConstraint('eId')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Employee')
    op.drop_table('Address')
    op.drop_table('Company')
    # ### end Alembic commands ###
