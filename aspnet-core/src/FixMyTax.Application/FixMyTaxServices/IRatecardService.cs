using Abp.Application.Services;
using Abp.Application.Services.Dto;
using FixMyTax.FixMyTaxServices.Dtos.Ratecard;
using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using Microsoft.AspNetCore.Http;
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

        Task<string> ImportRateCard(IFormFile file);

        Task<ListResultDto<RatecardListDto>> GetAll();
    }
}
