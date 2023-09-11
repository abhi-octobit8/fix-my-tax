using Abp.Reflection.Extensions;
using FixMyTax.Configuration;
using FixMyTax.FixMyTaxServices.Dtos.zoom;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace FixMyTax
{
    public class ZoomService
    {
        private readonly IConfigurationRoot _appConfiguration;
        private HttpClient client;
        private string token;
        private string accountId;
        private string clientId;
        private string clientSecret;
        private string topic;
        public ZoomService()
        {
            _appConfiguration = AppConfigurations.Get(
                typeof(FixMyTaxEmailSender).GetAssembly().GetDirectoryPathOrNull()
            );
            accountId = _appConfiguration["Zoom:accountId"];
            clientId = _appConfiguration["Zoom:clientId"];
            clientSecret = _appConfiguration["Zoom:clientSecret"];
            topic = _appConfiguration["Zoom:Topic"];
            client = new HttpClient();
        }

        private async Task AccessToken()
        {
            if (!string.IsNullOrEmpty(token))
            {
                return;
            }

            client.DefaultRequestHeaders.Clear();
            string url = $"https://zoom.us/oauth/token?grant_type=account_credentials&account_id={accountId}";
            var authenticationString = $"{clientId}:{clientSecret}";
            var base64Encoded = Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(authenticationString));

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, url);
            requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Basic", base64Encoded);
            
            var response = await client.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            JObject responseJson = JObject.Parse(await response.Content.ReadAsStringAsync());
            token = (string)responseJson["access_token"];

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        }


        public async Task<ZoomMeeting> CreateMeeting(ZoomMeetingRequest jMeet)
        {
            await AccessToken();
            string content = JsonConvert.SerializeObject(jMeet);
            //HttpContent httpContent = JsonContent.Create(jMeet);
            HttpResponseMessage response = await client.PostAsJsonAsync("https://api.zoom.us/v2/users/me/meetings", jMeet);

            response.EnsureSuccessStatusCode();
            JObject responseJson = JObject.Parse(await response.Content.ReadAsStringAsync());
            ZoomMeeting meeting = new ZoomMeeting();
            meeting.Topic = (string)responseJson["topic"];
            meeting.JoinUrl = (string)responseJson["join_url"];
            meeting.Time = (string)responseJson["start_time"];
            meeting.MeetingId = (string)responseJson["id"];
            meeting.Passcode = (string)responseJson["password"];
            return meeting;
        }
    }
}
