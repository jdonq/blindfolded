using System.Text.Json;
using System.IO;

namespace wbackend
{
    public class ScoreboardEntry
    {
        public int Score { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }

    public class ReturnScoreboardEntry
    {
        public int Score { get; set; }
        public string Name { get; set; }

        public ReturnScoreboardEntry(int s, string n)
        {
            Score = s;
            Name = n;
        }
    }
}
