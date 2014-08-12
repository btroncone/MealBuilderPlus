using System.Linq;
using System.Web.Http;
using MealBuilderPlus.Data;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Web.Controllers
{
    [RoutePrefix("api/ingredients")]
    public class IngredientController : BaseApiController
    {
        public IngredientController(IMealBuilderPlusRepository repo) : base(repo){}

        [Route("")]
        public IHttpActionResult Get()
        {
            var result = Repository.GetIngredients().Select(i => new
            {
                i.IngredientId,
                i.Name,
                i.CheckPantry
            });

            return Ok(result);

        }

        [Route("{ingredientId:int}")]
        public IHttpActionResult Delete(int ingredientId)
        {
            var ingredient = Repository.GetIngredient(ingredientId);
            if (ingredient == null)
            {
                return NotFound();
            }

            if (Repository.DeleteMeal(ingredientId) && Repository.SaveAll())
            {
                return Ok();
            }
            return BadRequest();

        }

        [Route("")]
        public IHttpActionResult Post([FromBody] Ingredient ingredient)
        {
            var newIngredient = Repository.Insert(ingredient);
            try
            {
                if (newIngredient != null && Repository.SaveAll())
                {
                    return Created(Request.RequestUri + newIngredient.IngredientId.ToString(), newIngredient);
                }
            }
            catch
            {
                //TODO Log
            }
            return BadRequest();
        }

        
    }
}
