using Blog.Data.EfCore;
using Blog.Data.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Xml.Linq;

namespace Blog.Repository
{
    public static class LikeRepository
    {
        private static List<Like> _likes;
        static LikeRepository()
        {
            using var context = new blogContext();
            _likes = context.Likes.ToList();
        }

        public static List<Story> GetLikesByUserId(string uId)
        {
            using var context = new blogContext();

            var resultLikes = context.Likes.Where(like => like.UserId == uId).ToList();
            if (resultLikes == null) { return null; }


            List<Story> resultStories = new List<Story>();

            resultLikes.ForEach(like =>
            {
                resultStories.Add(StoryRepository.GetStoryByStoryId(like.StoryId));
            });
            return resultStories;


        }

        public static List<Like> GetLikesByStoryId(string sId)
        {

            using var context = new blogContext();

            var resultLikes = context.Likes.Where(like => like.StoryId == sId).ToList();
            if (resultLikes == null) { return null; }

            return resultLikes;

        }

        public static void AddLike(LikeModel like)
        {
            using var context = new blogContext();
            try
            {
                Like newLike = new Like
                {
                    UserId = like.UserId,
                    StoryId = like.StoryId,
                    story = null,
                    user = null
                };
                context.Add(newLike);
                context.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception("Unknown Exception Thrown: "
                    + "\n  Type:    " + e.GetType().Name
                    + "\n  Message: " + e.Message); ;
            }
        }

        public static void DeleteLike(LikeModel likeData)
        {
            using var context = new blogContext();

            var dData = context.Likes.Where(like => (like.StoryId == likeData.StoryId) && (like.UserId == likeData.UserId)).FirstOrDefault();
            if (dData != null)
            {
                context.Likes.Remove(dData);
                context.SaveChanges();
            }

        }

    }
}
