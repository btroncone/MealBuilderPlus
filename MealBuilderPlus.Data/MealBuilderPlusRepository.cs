using System.Linq;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Data
{
    public class MealBuilderPlusRepository : IMealBuilderPlusRepository
    {
        public Meal GetMeal(int mealId)
        {
            throw new System.NotImplementedException();
        }

        public Meal GetMealByType(MealTypes mealType)
        {
            throw new System.NotImplementedException();
        }

        public IQueryable<Meal> GetAllEatenMeals()
        {
            throw new System.NotImplementedException();
        }

        public bool Insert(Meal meal)
        {
            throw new System.NotImplementedException();
        }

        public bool Insert(Ingredient ingredient)
        {
            throw new System.NotImplementedException();
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
    }
}