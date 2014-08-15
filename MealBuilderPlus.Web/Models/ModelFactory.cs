using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc.Html;
using MealBuilderPlus.Data;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Web.Models
{
    public class ModelFactory
    {
        public MealModel Create(Meal meal)
        {
            return new MealModel
            {
                MealId = meal.MealId,
                Description = meal.Description,
                LastEaten = meal.LastEaten,
                MealType = meal.MealType,
                Name = meal.Name,
                Ingredients = meal.Ingredients.Select(Create)
            };

        }

        public IngredientModel Create(Ingredient ingredient)
        {
            return new IngredientModel
            {
                IngredientId = ingredient.IngredientId,
                Name = ingredient.Name,
                CheckPantry = ingredient.CheckPantry,                         
            };

        }

        public IngredientModel CreateIngredientWithMeal(Ingredient ingredient)
        {
            return new IngredientModel
            {
                IngredientId = ingredient.IngredientId,
                Name = ingredient.Name,
                CheckPantry = ingredient.CheckPantry,
                Meals = ingredient.Meals.Select(m => new MealModel
                {
                    Name = m.Name,
                    LastEaten = m.LastEaten,
                    Description = m.Description
                })
            };
        }

    }
}