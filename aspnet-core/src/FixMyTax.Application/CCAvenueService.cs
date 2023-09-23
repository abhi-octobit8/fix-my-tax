using Abp.Net.Mail;
using Abp.Reflection.Extensions;
using FixMyTax.Configuration;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CCA.Util;
using Org.BouncyCastle.Asn1.Ocsp;

namespace FixMyTax
{
    public class CCAvenueService
    {
        private readonly IConfigurationRoot _appConfiguration;
        private readonly string merchantId;
        private readonly string workingKey;
        private readonly string accessKey;
        private readonly string url;
        private readonly string redirectUrl;
        private readonly string cancelUrl;


        public CCAvenueService()
        {
            _appConfiguration = AppConfigurations.Get(
                typeof(FixMyTaxEmailSender).GetAssembly().GetDirectoryPathOrNull()
            );

            merchantId = _appConfiguration["CCAvenue:merchantId"];
            workingKey = _appConfiguration["CCAvenue:workingKey"];
            accessKey = _appConfiguration["CCAvenue:accessCode"];
            redirectUrl = _appConfiguration["CCAvenue:redirectUrl"];
            cancelUrl = _appConfiguration["CCAvenue:cancelUrl"];
            url = _appConfiguration["CCAvenue:ccAvenueUrl"];
        }


        public string GetEncryptedUrl(string orderId, string amount, string name, string email, string ticketId)
        {
            NameValueCollection Params = new NameValueCollection();
            Params.Add("merchant_id", merchantId);
            Params.Add("order_id", orderId);
            Params.Add("currency", "INR");
            Params.Add("amount", amount);
            Params.Add("redirect_url", redirectUrl);
            Params.Add("cancel_url", cancelUrl);
            Params.Add("language", "en");
            Params.Add("billing_name", name);
            Params.Add("billing_email", email);
            Params.Add("merchant_param1", ticketId);

            string request = string.Empty;

            foreach(string key in Params)
            {
                request = request + key + "=" + Params[key] + "&";
            }
            CCACrypto crypto = new CCACrypto();
            request = crypto.Encrypt(request, workingKey);

            return string.Format(url, request, accessKey);  

        }

        public string DecryptResponse(string data)
        {
            CCACrypto crypto = new CCACrypto();
            return crypto.Decrypt(data, workingKey);
        }
    }
}
