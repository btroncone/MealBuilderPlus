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
    }
}
