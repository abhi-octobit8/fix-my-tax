using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxModels
{
    public enum TicketStatus
    {
        None = 0,
        New = 1,
        Assigned = 2,
        Responded= 3,
        Reopen = 4, 
        Resolved =5,
        Closed =6
    }
}
