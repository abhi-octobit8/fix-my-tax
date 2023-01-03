using System.Threading.Tasks;
using FixMyTax.Configuration.Dto;

namespace FixMyTax.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
