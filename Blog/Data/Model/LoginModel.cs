using System.ComponentModel.DataAnnotations;

namespace Blog.Data.Model
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public class ValidatePersonName : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string UserName = (string)validationContext.ObjectType.GetProperty("UserName").GetValue(validationContext.ObjectInstance, null);

            string Email = (string)validationContext.ObjectType.GetProperty("Email").GetValue(validationContext.ObjectInstance, null);

            //check at least one has a value
            if (string.IsNullOrEmpty(UserName) && string.IsNullOrEmpty(Email))
                return new ValidationResult("Kullanıcı adı ya da email gereklidir.");

            return ValidationResult.Success;
        }
    }


    public class LoginModel
    {
        [ValidatePersonName]
        public string UserName { get; set; } = null!;
        public string Email { get; set; }

        [Required(ErrorMessage = "Şifre gereklidir.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;
    }
}
