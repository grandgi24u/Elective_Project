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
            string endpoint = baseUrl + "/signin";
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
                User user = JsonConvert.DeserializeObject<User>(response);
                if(user.Role == "ROLE_ADMIN")
                    return user;
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public User GetUserDetails(User user)
        {
            string endpoint = baseUrl + "/users/getUser/" + user.Id;
            string access_token = user.AccessToken;

            WebClient wc = new WebClient();
            wc.Headers["Content-Type"] = "application/json";
            wc.Headers["x-access-token"] = access_token;
            try
            {
                string response = wc.DownloadString(endpoint);
                user = JsonConvert.DeserializeObject<User>(response);
                user.AccessToken = access_token;
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<User> GetAllUsers()
        {
            string endpoint = baseUrl + "/users/getUsers";
            string access_token = Globals.LoggedInUser.AccessToken;

            WebClient wc = new WebClient();
            wc.Headers["Content-Type"] = "application/json";
            wc.Headers["x-access-token"] = access_token;
            try
            {
                string response = wc.DownloadString(endpoint);
                List<User> res = JsonConvert.DeserializeObject<List<User>>(response);
                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
