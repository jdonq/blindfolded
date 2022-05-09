using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace wbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreboardController : ControllerBase
    {
        Backend backend = new Backend();

        [HttpGet]
        public List<ReturnScoreboardEntry> Get()
        {
            Scoreboard scoreboard = backend.GetScoreBoard();

            if (scoreboard != null)
            {
                List<ReturnScoreboardEntry> retScores = new List<ReturnScoreboardEntry>();

                foreach (var item in scoreboard.Scores)
                {
                    retScores.Add(new ReturnScoreboardEntry(item.Score, item.Name));
                }

                return retScores;
            } 
            else
            {
                return null;
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] ScoreboardEntry score)
        {
            bool status = backend.WriteToScoreBoard(score);

            if (status) return Ok();
            else return BadRequest("Score name already exists");
        }

        [HttpPut("{name}/{score}")]
        public IActionResult Put(string name, int score, [FromBody] string password)
        {
            bool status = backend.UpdateScoreBoard(name, password, score);

            if (status) return Ok();
            else return BadRequest("Entry name or password is invalid");
        }

        [HttpDelete("{name}")]
        public IActionResult Delete(string name, [FromBody]string password)
        {
            bool status = backend.DeleteScoreBoardEntry(name, password);
            
            if (status) return Ok();
            else return BadRequest("Entry name or password is invalid");
        }
    }
}
