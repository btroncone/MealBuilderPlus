using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MealBuilderPlus.Data;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Web.Models
{
    public class ModelFactory
    {
        private readonly IMealBuilderPlusRepository _repo;

        public ModelFactory(IMealBuilderPlusRepository repo)
        {
            _repo = repo;
        }

        public MealModel Create(Meal meal)
        {
            return new MealModel
            {
                Description = meal.Description,
                LastEaten = meal.LastEaten,
                MealType = meal.MealType,
                Name = meal.Name,
                Url = "NA"
            };
               
        }
    }
}