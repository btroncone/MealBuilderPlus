using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace MealBuilderPlus.Data
{
    public static class Extensions
    {
        public static void AttachAsModified<T>(this DbSet<T> dbSet, T entity, DbContext ctx) where T : class
        {
            DbEntityEntry<T> entityEntry = ctx.Entry(entity);
            if (entityEntry.State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }
            entityEntry.State = EntityState.Modified;
        }
    }
}