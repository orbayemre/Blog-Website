using System.ComponentModel.DataAnnotations.Schema;

namespace Blog.Data.EfCore
{
    public class Like
    {
        [ForeignKey("Story")]
        [Column(TypeName = "VARCHAR(255)")]
        public string StoryId { get; set; }
        public Story story { get; set; }


        [ForeignKey("User")]
        [Column(TypeName = "VARCHAR(255)")]
        public string UserId { get; set; }
        public User user { get; set; }

    }


}
