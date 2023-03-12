using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Dtos.Tickets
{
    public enum PaymentStatus
    {
        Paid = 0, 
        Pending = 1,
        TransactionFailed = 3,
        Returned = 4
    }
}
