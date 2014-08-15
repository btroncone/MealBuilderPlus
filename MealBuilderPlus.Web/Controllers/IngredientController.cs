using System;
using System.Diagnostics;
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
        public IHttpActionResult Get(int ingredientId)
        {
            var ingredient = ModelFactory.CreateIngredientWithMeal(Repository.GetIngredient(ingredientId));

            if (ingredient != null)
            {
                return Ok(ingredient);
            }
            
            return BadRequest();
        }

        [Route("{ingredientId:int}")]
        public IHttpActionResult Delete(int ingredientId)
        {
            var ingredient = Repository.GetIngredient(ingredientId);
            if (ingredient == null)
            {
                return NotFound();
            }

            if (Repository.DeleteIngredient(ingredientId) && Repository.SaveAll())
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

        [Route("")]
        public IHttpActionResult Put([FromBody] Ingredient ingredient)
        {
            try
            {
                if (Repository.Update(ingredient) && Repository.SaveAll())
                {
                    return Ok();
                }
            }
            catch
            {
                //TODO Log
            }
            return BadRequest("There was an error updating the entity!");
        }
    }
}
