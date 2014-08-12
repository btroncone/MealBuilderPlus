using System.Collections.Generic;

namespace MealBuilderPlus.Web.Models
{
    public class IngredientModel
    {
        public int IngredientId { get; set; }
        public string Name { get; set; }
        public bool? CheckPantry { get; set; }
        public IEnumerable<MealModel> Meals { get; set; }
    }
}