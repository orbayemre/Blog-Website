using System.ComponentModel.DataAnnotations;

namespace Blog.Data.Model
{
    public class LikeModel
    {
        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public string StoryId { get; set; } = null!;
    }
}
