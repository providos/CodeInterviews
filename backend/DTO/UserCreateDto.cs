using System.Text.Json.Serialization;

namespace homeassignment.DTO
{
    public class UserCreateDto
    {
        public int Id { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [JsonPropertyName("first_name")]
        public string? FirstName { get; set; }

        [JsonPropertyName("last_name")]
        public string? LastName { get; set; }

        [JsonPropertyName("avatar")]
        public string? Avatar { get; set; }
    }

}
