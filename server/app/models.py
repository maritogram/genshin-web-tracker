from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Category(Base):
    __tablename__ = 'category'

    cat_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    primos = Column(Integer, nullable=False)

    achievements = relationship("Achievement", back_populates="category")


class Achievement(Base):
    __tablename__ = 'achievement'

    ach_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    primos = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)
    category_id = Column(Integer, ForeignKey("category.cat_id"), nullable=False)
    requirements = Column(String)
    multiprt = Column(Integer, nullable=False)
    part = Column(Integer, nullable=False)

    category = relationship("Category", back_populates="achievements")




