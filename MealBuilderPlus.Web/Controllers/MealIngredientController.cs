using System.Web.Http;
using MealBuilderPlus.Data;

namespace MealBuilderPlus.Web.Controllers
{
    [RoutePrefix("api/ingredients")]
    public class MealIngredientController : BaseApiController
    {
        public MealIngredientController(IMealBuilderPlusRepository repo) : base(repo){}

        [Route("{ingredientId:int}/meals/{mealId:int}")]
        public IHttpActionResult Post(int ingredientId, int mealId)
        {
            var mealToUpdate = Repository.GetMeal(mealId);
            var ingredient = Repository.GetIngredient(ingredientId);

            if (ingredient == null || mealToUpdate == null)
            {
                return BadRequest("There was an error adding your ingredient. One of the entities was not found.");
            }

            try
            {
                mealToUpdate.Ingredients.Add(ingredient);
                Repository.SaveAll();
            }
            catch
            {
                //TODO Log
            }
            return Ok();
        }

        [Route("{ingredientId:int}/meals/{mealId:int}")]
        public IHttpActionResult Delete(int ingredientId, int mealId)
        {
            var mealToUpdate = Repository.GetMeal(mealId);
            var ingredient = Repository.GetIngredient(ingredientId);

            if (ingredient == null || mealToUpdate == null)
            {
                return BadRequest("There was an error deleting your ingredient. One of the entities was not found.");
            }

            try
            {
                mealToUpdate.Ingredients.Remove(ingredient);
                Repository.SaveAll();
            }
            catch
            {
                //TODO Log
            }
            return Ok();
        }
    }
}
