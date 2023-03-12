using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    public class UpdateAssignment
    {
        public List<int> TicketIds { get; set; }
        public int AssignUserId { get; set; }
    }
}
