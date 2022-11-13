using Blog.Data.EfCore;
using Blog.Data.Model;
using Blog.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Blog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class StoryController : ControllerBase
    {
        [HttpGet]
        public ActionResult<List<Story>> GetAll()
        {
            return StoryRepository.Stories;
        }

        [HttpGet("{id}")]
        public ActionResult<Story> GetById(string id)
        {
            try
            {
                return StoryRepository.GetStoryByStoryId(id);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpGet("userAllStories/{uid}")]
        public ActionResult<List<Story>> userAllStories(string uid)
        {
            try
            {
                return StoryRepository.GetStoriesByUserId(uid);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

        }

        [HttpPost]
        public ActionResult CreateStory(CreateStoryModel createStory)
        {
            try
            {
                Story newStory = new Story()
                {
                    StoryId = Guid.NewGuid().ToString(),
                    Title = createStory.Title,
                    Content = createStory.Content,
                    CreationTime = DateTime.Now,
                    LastModifiedTime = DateTime.Now,
                    UserId = createStory.UserId,
                };
                StoryRepository.CreateStory(newStory);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
            return Ok(JsonSerializer.Serialize("successful"));
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteStory(string id)
        {
            try
            {
                StoryRepository.DeleteStory(id);
                return Ok(JsonSerializer.Serialize("successful"));
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpPut]
        public ActionResult UpdateStory(UpdateStoryModel updStory)
        {
            try
            {
                StoryRepository.UpdateStory(updStory);
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }

            return Ok(updStory);
        }
    }
}
