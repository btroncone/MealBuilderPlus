using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MealBuilderPlus.Data;

namespace MealBuilderPlus.Web.Controllers
{
    [RoutePrefix("api/mealtypes")]
    public class MealTypeController : ApiController
    {
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(GetEnumList<MealTypes>());
        }

        public static List<T> GetEnumList<T>()
        {
            T[] array = (T[])Enum.GetValues(typeof(T));
            List<T> list = new List<T>(array);
            return list;
        }
    }
}
