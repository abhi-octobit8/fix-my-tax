using System.Threading.Tasks;
using FixMyTax.Models.TokenAuth;
using FixMyTax.Web.Controllers;
using Shouldly;
using Xunit;

namespace FixMyTax.Web.Tests.Controllers
{
    public class HomeController_Tests: FixMyTaxWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}