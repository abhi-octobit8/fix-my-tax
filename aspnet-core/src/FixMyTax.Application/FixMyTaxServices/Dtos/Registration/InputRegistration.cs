using FixMyTax.Authorization.Users;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using FixMyTax.Users.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace FixMyTax.FixMyTaxServices.Dtos.Registration
{
    public class InputRegistration
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        public string? PhoneNumber { get; set; }

        public FMTUserCategory UserCategory { get; set; }

    }
}
