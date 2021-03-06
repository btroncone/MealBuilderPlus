﻿using System.Linq;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Data
{
    public interface IMealBuilderPlusRepository
    {
        //Meal
        Meal GetMeal(int mealId);
        IQueryable<Meal> GetMeals();
        Meal GetMealByType(MealTypes mealType);

        //Ingredients
        IQueryable<Ingredient> GetIngredients();
        Ingredient GetIngredient(int ingredientId);

        //Inserts
        Meal Insert(Meal meal);
        Ingredient Insert(Ingredient ingredient);

        //Updates
        bool Update(Meal meal);
        bool Update(Ingredient ingredient);

        //Deletes
        bool DeleteMeal(int id);
        bool DeleteIngredient(int id);

        //Save
        bool SaveAll();
    }
}