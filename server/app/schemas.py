from pydantic import BaseModel


class CategoryBase(BaseModel):
    title: str
    quantity: int
    primos: int


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    cat_id: int

    class Config:
        orm_mode = True


class AchievementBase(BaseModel):
    name: str
    description: str
    primos: int
    requirements: str
    multprt: int
    part: int


class AchievementCreate(AchievementBase):
    pass


class Achievement(AchievementBase):
    ach_id: int
    category_id: int
    category: list[Category] = []

    class Config:
        orm_mode = True