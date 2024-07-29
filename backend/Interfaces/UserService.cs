using homeassignment.DTO;
using homeassignment.ReqResApi;

namespace homeassignment.Interfaces
{
    public class UserService : IUserService
    {
        private readonly HttpClient _httpClient;

        public UserService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync(int page)
        {
            var response = await _httpClient.GetFromJsonAsync<ApiResponse<UserDto>>($"https://reqres.in/api/users?page={page}");
            return response?.Data ?? new List<UserDto>();
        }

        public async Task<UserDto?> GetUserAsync(int id)
        {
            var response = await _httpClient.GetFromJsonAsync<UserResponse>($"https://reqres.in/api/users/{id}");
            return response?.Data;
        }

        public async Task<UserDto> CreateUserAsync(UserCreateDto userCreateDto)
        {
            var response = await _httpClient.PostAsJsonAsync("https://reqres.in/api/users", userCreateDto);
            response.EnsureSuccessStatusCode();
            var createdUser = await response.Content.ReadFromJsonAsync<UserDto>();
            return createdUser;
        }

        public async Task<UserDto?> UpdateUserAsync(int id, UserUpdateDto userUpdateDto)
        {
            var response = await _httpClient.PutAsJsonAsync($"https://reqres.in/api/users/{id}", userUpdateDto);
            if (response.IsSuccessStatusCode)
            {
                var updatedUser = await response.Content.ReadFromJsonAsync<UserDto>();
                return updatedUser;
            }
            return null;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"https://reqres.in/api/users/{id}");
            return response.IsSuccessStatusCode;
        }
    }
}
