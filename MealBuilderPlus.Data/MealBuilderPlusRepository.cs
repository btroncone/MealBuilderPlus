using System;
using System.Linq;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Data
{
    public class MealBuilderPlusRepository : IMealBuilderPlusRepository
    {
        private readonly MealBuilderPlusContext _context;

        public MealBuilderPlusRepository(MealBuilderPlusContext context)
        {
            _context = context;
        }
        public Meal GetMeal(int mealId)
        {
            return _context.Meals.Find(mealId);
        }

        public IQueryable<Meal> GetMeals()
        {
            return _context.Meals;
        }

        public Meal GetMealByType(MealTypes mealType)
        {
            return _context.Meals.Where(m => m.MealType.Equals(mealType))
                                 .OrderBy(m => Guid.NewGuid())
                                 .FirstOrDefault();
        }

        public IQueryable<Meal> GetAllEatenMeals()
        {
            throw new System.NotImplementedException();
        }

        public Meal Insert(Meal meal)
        {
            try
            {
                return _context.Meals.Add(meal);
                
            }
            catch
            {
                return null;
            }
        }

        public bool Insert(Ingredient ingredient)
        {
            try
            {
                _context.Ingredients.Add(ingredient);
                return true;
            }
            catch
            {
                return false;
            };
        }

        public bool Update(Meal meal)
        {
            throw new System.NotImplementedException();
        }

        public bool Update(Ingredient ingredient)
        {
            throw new System.NotImplementedException();
        }

        public bool DeleteMeal(int id)
        {
            throw new System.NotImplementedException();
        }

        public bool DeleteIngredient(int id)
        {
            throw new System.NotImplementedException();
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}