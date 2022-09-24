using System.Threading.Tasks;
using PostalBag.Models.TokenAuth;
using PostalBag.Web.Controllers;
using Shouldly;
using Xunit;

namespace PostalBag.Web.Tests.Controllers
{
    public class HomeController_Tests: PostalBagWebTestBase
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