using System.ComponentModel.DataAnnotations;

namespace Blog.Data.Model
{
    public class CreateStoryModel
    {
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "Content Zorunludur")]
        public string Content { get; set; } = null!;

        [Required]
        public string UserId { get; set; } = null!;
    }
}
