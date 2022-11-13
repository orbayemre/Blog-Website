using Blog.Data.EfCore;
using Blog.Data.Model;
using Blog.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Blog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LikeController : ControllerBase
    {
        [HttpGet("byuserid/{id}")]
        public ActionResult<List<Story>> GetLikesByUserId(string id)
        {
            try
            {
                return LikeRepository.GetLikesByUserId(id);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
        [HttpGet("bystoryid/{id}")]
        public ActionResult<List<Like>> GetLikesByStoryId(string id)
        {
            try
            {
                return LikeRepository.GetLikesByStoryId(id);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpPost("addlike")]
        public ActionResult AddLike(LikeModel like)
        {
            try
            {
                LikeRepository.AddLike(like);
                return Ok(JsonSerializer.Serialize("successful"));
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }
        [HttpPost("deletelike")]
        public ActionResult DeleteLike(LikeModel like)
        {
            try
            {
                LikeRepository.DeleteLike(like);
                return Ok(JsonSerializer.Serialize("successful"));
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }


    }
}
