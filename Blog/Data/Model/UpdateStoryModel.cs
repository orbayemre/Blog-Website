using System.ComponentModel.DataAnnotations;

namespace Blog.Data.Model
{
    public class UpdateStoryModel
    {
        [Required]
        public string StoryId { get; set; } = null!;

        public string Title { get; set; } = null!; 

        [Required(ErrorMessage = "Content Zorunludur")]
        public string Content { get; set; } = null!;
    }
}
