using FixMyTax.FixMyTaxServices.Dtos.Tickets;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices
{
    public interface IFileService
    {
        Task<string> UploadRequestFile(int id, IFormFile file);

        Task<string> UploadResponseFile(int id, IFormFile file);

        Task<string> UploadCategoryProofFile(int userId, IFormFile file);
        Task<FileContentResult> DownloadProofFile(int id);

        Task<FileContentResult> DownloadFile(int id);
    }
}
