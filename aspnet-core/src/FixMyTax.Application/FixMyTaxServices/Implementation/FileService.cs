using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using FixMyTax.Authorization.Users;
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
        private readonly IRepository<CategoryProofFiles> _proofRepository;
        private readonly UserManager _userManager;


        public FileService(IRepository<RequestTicket> ticketRepository, IRepository<TicketResponse> responseRepository,
            IRepository<Attachment> fileRepository, IRepository<CategoryProofFiles> proofRepository,  UserManager userManager)
        {
            _ticketRepository = ticketRepository;
            _responseRepository = responseRepository;
            _fileRepository = fileRepository;
            _userManager = userManager;
            _proofRepository = proofRepository;
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
            if (file == null)
            {
                throw new BadHttpRequestException("file not found");
            }
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
            if (file == null)
            {
                throw new BadHttpRequestException("file not found");
            }
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

        public async Task<FileContentResult> DownloadProofFile(int id)
        {
            var file = await _proofRepository.FirstOrDefaultAsync(id);
            if (file == null)
            {
                throw new FileNotFoundException();
            }

            return new FileContentResult(file.FileData, "application/pdf")
            {
                FileDownloadName = file.Filename
            };
        }

        public async Task<string> UploadCategoryProofFile(int userId, IFormFile file)
        {
            if (file == null)
            {
                throw new BadHttpRequestException("file not found");
            }

            var user = _userManager.GetUserById(userId);
            if (user == null)
            {
                throw new EntityNotFoundException("no object found for the given id");
            }

            if (file != null)
            {
                CategoryProofFiles proof = new CategoryProofFiles();
                proof.Filename = file.FileName;
                using (var item = new MemoryStream())
                {
                    file.CopyTo(item);
                    proof.FileData = item.ToArray();
                    proof.CreationTime = DateTime.Now;
                }

                var id = await _proofRepository.InsertAndGetIdAsync(proof);
                user.CategoryProofId = id;
                await _userManager.UpdateAsync(user);
            }

            return $"File successfully uploaded to user ";
        }
    }
}
