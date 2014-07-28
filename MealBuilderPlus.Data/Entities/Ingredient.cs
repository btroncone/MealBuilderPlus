using System.Collections;
using System.Collections.Generic;

namespace MealBuilderPlus.Data.Entities
{
    public class Ingredient
    {
        public Ingredient()
        {
            Meals = new List<Meal>();
        }
        public int IngredientId { get; set; }
        public string Name { get; set; }
        public bool? CheckPantry { get; set; }

        public virtual ICollection<Meal> Meals { get; set; }
    }
}