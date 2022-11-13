using Blog.Data.EfCore;
using Blog.Data.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Blog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterModel registerModel)
        {
            if (ModelState.IsValid)
            {
                User user = new User()
                {
                    UserName = registerModel.UserName,
                    Email = registerModel.Email,
                };

                var result = await _userManager.CreateAsync(user, registerModel.Password);

                if (result.Succeeded)
                {
                    var userInfo = await _userManager.FindByNameAsync(registerModel.UserName);
                    return Ok(userInfo);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        return BadRequest(error.Description);
                    }
                }
            }
            return BadRequest("Geçersiz kayıt bilgileri");
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginModel loginModel)
        {
            if (ModelState.IsValid)
            {

                var userInfo = await _userManager.FindByNameAsync(loginModel.UserName);

                if (userInfo == null)
                {
                    userInfo = await _userManager.FindByEmailAsync(loginModel.Email);
                }
                if(userInfo == null)
                {
                    return BadRequest("Bu kullanıcı adına ya da email adresine sahip hesap bulunmamaktadır.");
                }

                var result = await _signInManager.PasswordSignInAsync(userInfo, loginModel.Password, true, false);

                if (result.Succeeded)
                {
                    return Ok(userInfo);
                }
                else
                {
                    return BadRequest("Yanlış Şifre");
                }


            }
            return BadRequest("Geçersiz giriş bilgileri");
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(JsonSerializer.Serialize("Çıkış yapıldı."));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserInfoByUserId(string id)
        {
            var userInfo = await _userManager.FindByIdAsync(id);
            
            return Ok(userInfo);
        }



    }
}
