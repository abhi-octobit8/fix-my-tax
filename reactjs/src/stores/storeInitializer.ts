import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SiteStore from './siteStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';
import SearchByTagStore from './searchByTagStore';
import SearchBySiteStore from './searchBySiteStore';
import DashboardStore from './dashboardStore';
import ScansStore from './scansStore';
import HelpStore from './helpStore';
import CheckTagStore from './checkTagStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    siteStore: new SiteStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
    searchByTagStore: new SearchByTagStore(),
    searchBySiteStore: new SearchBySiteStore(),
    dashboardStore: new DashboardStore(),
    scansStore: new ScansStore(),
    helpStore: new HelpStore(),
    checkTagStore: new CheckTagStore(),
  };
}
