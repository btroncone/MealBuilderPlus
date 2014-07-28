﻿using System.Linq;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Data
{
    public interface IMealBuilderPlusRepository
    {
        Meal GetMeal(int mealId);
        Meal GetMealByType(MealTypes mealType);
        IQueryable<Meal> GetAllEatenMeals();


        //Inserts
        bool Insert(Meal meal);
        bool Insert(Ingredient ingredient);

        //Updates
        bool Update(Meal meal);
        bool Update(Ingredient ingredient);

        //Deletes
        bool DeleteMeal(int id);
        bool DeleteIngredient(int id);
    }
}