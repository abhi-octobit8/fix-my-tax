using System.ComponentModel.DataAnnotations;

namespace FixMyTax.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}