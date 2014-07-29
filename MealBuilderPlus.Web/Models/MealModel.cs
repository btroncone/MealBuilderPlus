using System;
using MealBuilderPlus.Data;

namespace MealBuilderPlus.Web.Models
{
    public class MealModel
    {
        public string Url { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime LastEaten { get; set; }
        public MealTypes MealType { get; set; }
    }
}