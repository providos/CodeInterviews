using homeassignment.DTO;

namespace homeassignment.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetUsersAsync(int page);
        Task<UserDto?> GetUserAsync(int id);
        Task<UserDto> CreateUserAsync(UserCreateDto userCreateDto);
        Task<UserDto?> UpdateUserAsync(int id, UserUpdateDto userUpdateDto);
        Task<bool> DeleteUserAsync(int id);
    }
}