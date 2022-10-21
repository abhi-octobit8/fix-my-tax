using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Threading.BackgroundWorkers;
using Abp.Threading.Timers;
using PostalBag.IPModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostalBag.Jobs
{
    public class BackgroundSiteStateChecker : PeriodicBackgroundWorkerBase, ISingletonDependency
    {
        private readonly IRepository<Site> _siteRepository;
        private readonly IRepository<SiteHealth> _siteHealthRepository;

        public BackgroundSiteStateChecker(AbpTimer timer, IRepository<Site> siteRepository, IRepository<SiteHealth> siteHealthRepository)
        : base(timer)
        {
            _siteRepository = siteRepository;
            _siteHealthRepository = siteHealthRepository;
            Timer.Period = 30000; 
        }

        [UnitOfWork]
        protected override void DoWork()
        {
            using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                var sites = _siteRepository.GetAllList();

                foreach (var site in sites)
                {
                    var siteHealth = _siteHealthRepository.Query(x => x.OrderByDescending(t => t.CreationTime)).FirstOrDefault(x => x.SiteId == site.Id);
                    if (siteHealth != null && siteHealth.CreationTime < DateTime.Today.AddDays(-6))
                    {
                        Logger.Info(string.Format("site {0} havent had any communication with central server in last 30 minutes, making it down", site.SiteCode));
                        site.State = SiteState.Down;
                        site.InternetState = SiteInternetState.Offline;
                        _siteRepository.Update(site);
                    }
                }

                CurrentUnitOfWork.SaveChanges();
            }
        }
    }
}
