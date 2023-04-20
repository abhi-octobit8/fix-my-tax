using Abp.Application.Services;
using FixMyTax.FixMyTaxServices.Dtos.Ratecard;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices
{
    public interface IRatecardService : IApplicationService
    {
        Task<RatecardListDto> Create(CreateRatecardInput input);
        Task<RatecardListDto> Get(string pricingKey);

        Task<RatecardDto> GetTotalPrice(string pricingKey);

        Task<RatecardListDto> GetAll();
    }
}
