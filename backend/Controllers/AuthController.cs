using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using homeassignment.Models;
using Microsoft.AspNetCore.Identity.Data;

namespace homeassignment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        //private SymmetricSecurityKey _key;


        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;

        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            if (login.Username == "test" && login.Password == "test")
            {
                var issuer = _configuration["Jwt:Issuer"];
                var audience = _configuration["Jwt:Audience"];
                var _key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim("Id",Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Sub, login.Username),
                        new Claim(JwtRegisteredClaimNames.Email, login.Username),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                   }),

                    Expires = DateTime.UtcNow.AddMinutes(10),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var stringToken = tokenHandler.WriteToken(token);
                return Ok(new { Token = stringToken });
            }
            return Unauthorized();
        }
    }
}
