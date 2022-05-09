namespace wbackend
{
    public class Scoreboard
    {
        public List<ScoreboardEntry> Scores { get; set; }

        public Scoreboard()
        {
            Scores = new List<ScoreboardEntry>();
        }
    }
}
