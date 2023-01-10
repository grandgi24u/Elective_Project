using System;
using System.Collections.Generic;
using System.Text;

using ServiceAdministratif.Models;
using Newtonsoft.Json;
using System.Net;

namespace ServiceAdministratif.Models
{
    class ApiOperations
    {
        private string baseUrl;

        public ApiOperations()
        {
            this.baseUrl = "http://localhost:4000";
        }

        public User AuthenticateUser(string email, string password)
        {
            string endpoint = this.baseUrl + "/signin";
            string method = "POST";
            string json = JsonConvert.SerializeObject(new
            {
                email = email,
                password = password
            });

            WebClient wc = new WebClient();
            wc.Headers["Content-Type"] = "application/json";
            try
            {
                string response = wc.UploadString(endpoint, method, json);
                return JsonConvert.DeserializeObject<User>(response);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
