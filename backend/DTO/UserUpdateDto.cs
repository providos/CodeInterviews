using System.Text.Json.Serialization;

namespace homeassignment.DTO
{
    public class UserUpdateDto
    {
        public int Id { get; set; }

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [JsonPropertyName("first_name")]
        public string? FirstName { get; set; }
        
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        
        [JsonPropertyName("job")]
        public string? Job { get; set; }

        [JsonPropertyName("last_name")]
        public string? LastName { get; set; }

        [JsonPropertyName("avatar")]
        public string? Avatar { get; set; }
    }

}
