using System.ComponentModel.DataAnnotations;

namespace PostalBag.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}