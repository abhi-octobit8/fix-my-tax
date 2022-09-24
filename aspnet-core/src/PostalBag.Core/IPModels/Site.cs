using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Timing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.IPModels
{
    [Table("Sites")]
    public class Site : Entity, IHasCreationTime
    {
        [Required]
        public string SiteName { get; set; }
        [Required]
        public string SiteCode { get; set; }

        [Required]
        public string Location { get; set; }
        [Required]
        public string ContactPerson { get; set; }
        [Required]
        public string ContactNumber { get; set; }

        public DateTime LastHealthCheckTime { get; set; }

        public SiteState State { get; set; }

        public SiteInternetState InternetState { get; set; }

        public SiteReaderState ReaderState { get; set; }



        public Guid SiteSecret { get; set; }

        public string Longitude { get; set; }
        public string Latitude { get; set; }

        public DateTime CreationTime { get; set; }


        public Site()
        {
            CreationTime = Clock.Now;
            State = SiteState.UnderConstruction;
            InternetState = SiteInternetState.Offline;
        }
    }


    public enum SiteState
    {
        UnderConstruction = 0,
        Ready = 1,
        Fault = 2,
        Down = 3
    }

    public enum SiteReaderState
    {
        Down = 0,
        Up = 1
    }

    public enum SiteInternetState : byte
    {
        Offline = 0,
        Online = 1,
    }


}
