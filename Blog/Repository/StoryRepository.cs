using Blog.Data.EfCore;
using Blog.Data.Model;

namespace Blog.Repository
{
    public static class StoryRepository
    {
        private static List<Story> _stories;

        static StoryRepository()
        {
            using var context = new blogContext();
            _stories = context.Stories.ToList();
        }

        public static List<Story> Stories 
        { 
            get { return _stories; } 
        }

        public static void CreateStory(Story sData)
        {
            using var context = new blogContext();

            try
            {
                context.Add(sData);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception("Unknown Exception Thrown: "
                    + "\n  Type:    " + e.GetType().Name
                    + "\n  Message: " + e.Message); ;
            }
        }

        public static Story GetStoryByStoryId(string id)
        {
            using var context = new blogContext();

            var result = context.Stories.Where(story => story.StoryId == id).FirstOrDefault();
            if (result == null) { return null; }
            return result;


        }

        public static List<Story> GetStoriesByUserId(string uId)
        {

            using var context = new blogContext();

            var result = context.Stories.Where(story => story.UserId == uId).ToList();
            if (result == null) { return null; }
            return result;


        }

        public static void UpdateStory(UpdateStoryModel updateStory)
        {
            using var context = new blogContext();
            var dData = context.Stories.Where(story => story.StoryId == updateStory.StoryId).FirstOrDefault();
            if (dData != null)
            {
                dData.Title = updateStory.Title;
                dData.Content = updateStory.Content;
                dData.LastModifiedTime = DateTime.Now;
                context.SaveChanges();
            }
        }

        public static void DeleteStory(string id)
        {
            using var context = new blogContext();

            var dData = context.Stories.Where(story => story.StoryId == id).FirstOrDefault();
            if (dData != null)
            {
                context.Stories.Remove(dData);
                context.SaveChanges();
            }
        }
    }
}
