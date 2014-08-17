using System;
using System.Collections.Generic;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Data.Services
{
    public class MealEaterService : IMealEaterService
    {
        private readonly IMealBuilderPlusRepository _repo;
        public MealEaterService(IMealBuilderPlusRepository repo)
        {
            _repo = repo;
        }
        public bool MarkAsEaten(List<Meal> meals)
        {
            try
            {
                foreach (var meal in meals)
                {
                    meal.LastEaten = DateTime.Now;
                    _repo.Update(meal);
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}