using Abp.Application.Services;
using Microsoft.AspNetCore.Http;
using PostalBag.PostalBagServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.PostalBagServices
{
    /// <summary>
    /// Interface for bag service
    /// </summary>
    public interface IBagService : IApplicationService
    {
        Task Create(CreateBagInput input);
        Task<ImportBagOutput> ImportBagTag(IFormFile file);

        Task<BagDto> GetTag(CreateBagInput input);

    }
}
