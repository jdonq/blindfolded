using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace wbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenValuesController : ControllerBase
    {
        GenValues genValues = new GenValues();

        [HttpGet]
        public Vector2 Get()
        {
            Vector2 vector2 = genValues.GenerateNewPosition();

            return vector2;
        }
    }
}
