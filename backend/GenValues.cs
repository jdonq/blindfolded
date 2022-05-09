namespace wbackend
{
    public class GenValues
    {
        public Vector2 GenerateNewPosition()
        {
            Random random = new Random();
            Vector2 vector2 = new Vector2();
            vector2.x = random.Next(0, 11);
            vector2.y = random.Next(0, 11);
            return vector2;
        }
    }

    public class Vector2
    {
        public int x { get; set; }
        public int y { get; set; }
    }
}
