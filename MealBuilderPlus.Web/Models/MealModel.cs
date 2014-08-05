using System;
using System.Collections.Generic;
using MealBuilderPlus.Data;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Web.Models
{
    public class MealModel
    {
        public int MealId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? LastEaten { get; set; }
        public MealTypes MealType { get; set; }
        public IEnumerable<IngredientModel> Ingredients { get; set; }
    }
}