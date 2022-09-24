using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices.Dtos.Dashboard
{
    public class ContactUsInput
    {
        public string Name { get; set; }
        public string EmailId { get; set; }
        public string Phone { get; set; }
        public string Subject { get; set; }
        public string Description { get;set; }
    }
}
