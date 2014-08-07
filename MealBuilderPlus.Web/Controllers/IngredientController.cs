using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MealBuilderPlus.Data;
using MealBuilderPlus.Web.Models;

namespace MealBuilderPlus.Web.Controllers
{
    [RoutePrefix("api/ingredients")]
    public class IngredientController : BaseApiController
    {
        public IngredientController(IMealBuilderPlusRepository repo) : base(repo)
        {
        }
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

            }
            return Ok();
        }
    }
}
