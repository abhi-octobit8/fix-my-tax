using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using FixMyTax.FixMyTaxModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax.FixMyTaxServices.Implementation
{
    public class FileService : FixMyTaxAppServiceBase, IFileService
    {
        private readonly IRepository<RequestTicket> _ticketRepository;
        private readonly IRepository<TicketResponse> _responseRepository;
        private readonly IRepository<Attachment> _fileRepository;


        public FileService(IRepository<RequestTicket> ticketRepository, IRepository<TicketResponse> responseRepository,
            IRepository<Attachment> fileRepository)
        {
            _ticketRepository = ticketRepository;
            _responseRepository = responseRepository;
            _fileRepository = fileRepository;
        }
        public async Task<FileContentResult> DownloadFile(int id)
        {
            var file = await _fileRepository.FirstOrDefaultAsync(id);
            if(file == null)
            {
                throw new FileNotFoundException();
            }

            return new FileContentResult(file.FileData, "application/pdf")
            {
                FileDownloadName = file.Filename
            };
        }

        public async Task<string> UploadRequestFile(int id, IFormFile file)
        {
            var ticket = _ticketRepository.FirstOrDefault(id);

            if (ticket == null)
            {
                throw new EntityNotFoundException("no object found for the given id");
            }

            if (file != null)
            {
                Attachment att = new Attachment();
                att.Filename = file.FileName;
                using (var item = new MemoryStream())
                {
                    file.CopyTo(item);
                    att.FileData = item.ToArray();
                    att.CreationTime = DateTime.Now;
                }
                ticket.Attachments = new List<Attachment>();
                ticket.Attachments.Add(att);

            }

            await _ticketRepository.UpdateAsync(ticket);

            return $"File successfully uploaded to request ticket {id.ToString()}";
        }

        public async Task<string> UploadResponseFile(int id, IFormFile file)
        {
            var response = _responseRepository.FirstOrDefault(id);

            if (response == null)
            {
                throw new EntityNotFoundException("no object found for the given id");
            }

            if (file != null)
            {
                Attachment att = new Attachment();
                att.Filename = file.FileName;
                using (var item = new MemoryStream())
                {
                    file.CopyTo(item);
                    att.FileData = item.ToArray();
                    att.CreationTime = DateTime.Now;
                }
                response.Attachments = new List<Attachment>();
                response.Attachments.Add(att);

            }

            await _responseRepository.UpdateAsync(response);

            return $"File successfully uploaded to request response {id.ToString()}";
        }
    }
}
