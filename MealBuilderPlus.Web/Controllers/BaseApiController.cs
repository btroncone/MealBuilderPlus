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
    public abstract class BaseApiController : ApiController
    {
        private readonly IMealBuilderPlusRepository _repo;
        private ModelFactory _modelFactory;

        protected BaseApiController(IMealBuilderPlusRepository repo)
        {
            _repo = repo;
        }

        protected IMealBuilderPlusRepository Repository
        {
            get { return _repo; }
        }

        protected ModelFactory ModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(Repository);
                }
                return _modelFactory;
            }
        }
    }
}
