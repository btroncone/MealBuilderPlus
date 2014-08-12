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
            return _context.Meals.Include("Ingredients")
                                 .FirstOrDefault(m => m.MealId.Equals(mealId));
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

        public Ingredient GetIngredient(int ingredientId)
        {
            return _context.Ingredients.Include("Meals").FirstOrDefault(i => i.IngredientId.Equals(ingredientId));
        }

        public IQueryable<Ingredient> GetIngredients()
        {
            return _context.Ingredients;
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

        public Ingredient Insert(Ingredient ingredient)
        {
            try
            {
                return _context.Ingredients.Add(ingredient);
                
            }
            catch
            {
                return null;
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
            try
            {
                var entity = _context.Meals.FirstOrDefault(d => d.MealId == id);
                if (entity != null)
                {
                    _context.Meals.Remove(entity);
                    return true;
                }
            }
            catch
            {

            }
            return false;
        }

        public bool DeleteIngredient(int id)
        {
            try
            {
                var entity = _context.Ingredients.FirstOrDefault(d => d.IngredientId == id);
                if (entity != null)
                {
                    _context.Ingredients.Remove(entity);
                    return true;
                }
            }
            catch
            {

            }
            return false;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }
    }
}