using System.Threading.Tasks;
using PostalBag.Configuration.Dto;

namespace PostalBag.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
