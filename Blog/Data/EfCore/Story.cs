using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Data.EfCore
{
    public partial class Story
    {
        [Key]
        [Column(TypeName = "VARCHAR(255)")]
        public string StoryId { get; set; } = null!;

        [Column(TypeName = "VARCHAR(255)")]
        public string Title { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public DateTime LastModifiedTime { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(255)")]
        [ForeignKey("User")]
        public string UserId { get; set; } = null!;
        public User user { get; set; }

        public ICollection<Like> likes { get; set; }
    }
}
