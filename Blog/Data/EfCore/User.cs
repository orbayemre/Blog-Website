using Microsoft.AspNetCore.Identity;

namespace Blog.Data.EfCore
{
    public class User : IdentityUser
    {
        public ICollection<Like> likes { get; set; }
        public ICollection<Story> stories { get; set; }
    }
}
