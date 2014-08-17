using System.Collections.Generic;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Data.Services
{
    public interface IMealEaterService
    {
        bool MarkAsEaten(List<Meal> meals);
    }
}