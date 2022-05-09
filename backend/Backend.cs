using System.Text.Json;
using System.Security.Cryptography;
using System.IO;
using System.Text;

namespace wbackend
{
    public class Backend
    {
        
        public bool WriteToScoreBoard(ScoreboardEntry score)
        {
            Scoreboard scoreboard = ReadScoreBoard();

            if(scoreboard == null)
            {
                scoreboard = new Scoreboard();
            }

            foreach(ScoreboardEntry entry in scoreboard.Scores)
            {
                if(entry.Name == score.Name)
                {
                    return false;
                }
            }

            scoreboard.Scores.Add(score);
            HashAlgorithm algorithm = SHA256.Create();
            byte[] hash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(score.Password + "super(Secret)123"));
            score.Password = BitConverter.ToString(hash).Replace("-", String.Empty);
            string jsonDoc = JsonSerializer.Serialize(scoreboard);
            File.WriteAllText("Database.json", jsonDoc);

            return true;
        }

        public bool DeleteScoreBoardEntry(string name, string password)
        {
            Scoreboard scoreboard = ReadScoreBoard();

            if (scoreboard == null)
            {
                return false;
            }

            HashAlgorithm algorithm = SHA256.Create();
            byte[] hash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(password + "super(Secret)123"));
            password = BitConverter.ToString(hash).Replace("-", String.Empty);

            foreach (ScoreboardEntry entry in scoreboard.Scores)
            {
                if (entry.Name == name && entry.Password == password)
                {
                    scoreboard.Scores.Remove(entry);
                    string jsonDoc = JsonSerializer.Serialize(scoreboard);
                    File.WriteAllText("Database.json", jsonDoc);
                    return true;
                }
            }

            return false;
        }

        public bool UpdateScoreBoard(string name, string password, int score)
        {
            Scoreboard scoreboard = ReadScoreBoard();

            if (scoreboard == null)
            {
                return false;
            }

            HashAlgorithm algorithm = SHA256.Create();
            byte[] hash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(password + "super(Secret)123"));
            password = BitConverter.ToString(hash).Replace("-", String.Empty);

            foreach (ScoreboardEntry entry in scoreboard.Scores)
            {
                if (entry.Name == name && entry.Password == password)
                {
                    entry.Score = score;
                    string jsonDoc = JsonSerializer.Serialize(scoreboard);
                    File.WriteAllText("Database.json", jsonDoc);
                    return true;
                }
            }

            return false;

        }

        public Scoreboard ReadScoreBoard()
        {
            try
            {
                string data = File.ReadAllText("Database.json");
                Scoreboard scoreboard = JsonSerializer.Deserialize<Scoreboard>(data);

                return scoreboard;
            }
            catch (FileNotFoundException e)
            {
                return null;
            }
        }

        public Scoreboard GetScoreBoard()
        {
            Scoreboard scoreboard = ReadScoreBoard();
            return scoreboard;
        }
    }
}
