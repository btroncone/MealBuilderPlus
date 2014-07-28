using System;
using System.Collections;
using System.Collections.Generic;

namespace MealBuilderPlus.Data.Entities
{
    public class Meal
    {
        public Meal()
        {
            Ingredients = new List<Ingredient>();
        }
        public int MealId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime LastEaten { get; set; }
        public MealTypes MealType { get; set; } 
            
        public virtual ICollection<Ingredient> Ingredients { get; set; }
 
    }
}