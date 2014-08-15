using System;
using System.Linq;
using System.Web.Http;
using MealBuilderPlus.Data;
using MealBuilderPlus.Data.Entities;

namespace MealBuilderPlus.Web.Controllers
{
    [RoutePrefix("api/meals")]
    public class MealController : BaseApiController
    {
        public MealController(IMealBuilderPlusRepository repo) : base(repo){}

        [Route("")]
        public IHttpActionResult Get()
        {
            var meals = Repository.GetMeals()
                                  .ToList()
                                  .Select(m => ModelFactory.Create(m));
            return Ok(meals);
        }

        [Route("{mealId:int}")]
        public IHttpActionResult Get(int mealId)
        {
            var meal = ModelFactory.Create(Repository.GetMeal(mealId));
            
            return Ok(meal);
        }

        [Route("{mealId:int}")]
        public IHttpActionResult Delete(int mealId)
        {
            var meal = Repository.GetMeal(mealId);
            if (meal == null)
            {
                return NotFound();
            }

            if (Repository.DeleteMeal(mealId) && Repository.SaveAll())
            {
                return Ok();
            }
            return BadRequest();
        }

        [Route("")]
        public IHttpActionResult Post([FromBody] Meal meal)
        {
            var newMeal = Repository.Insert(meal);
            try
            {
                if (newMeal != null && Repository.SaveAll())
                {
                    return Created(Request.RequestUri + newMeal.MealId.ToString(), newMeal);
                }
            }
            catch
            {
               //TODO Log 
            }
            return BadRequest();
        }

        [Route("")]
        public IHttpActionResult Put([FromBody] Meal meal)
        {
            try
            {
                if (Repository.Update(meal) && Repository.SaveAll())
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
