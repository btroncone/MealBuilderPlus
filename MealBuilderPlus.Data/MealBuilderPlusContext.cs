using System.Data.Entity;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Data
{
    public class MealBuilderPlusContext : DbContext
    {
        public MealBuilderPlusContext()
            :base("MealBuilderPlusContext")
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Meal> Meals { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
    }
}