﻿using System;
using System.Collections.Generic;
using System.Text;

using ServiceAdministratif.Models;
using Newtonsoft.Json;
using System.Net;
using System.IO;

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
                if (user.Role == "ROLE_ADMIN")
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

        public List<User> SearchForUser(string name, string surname)
        {
            string endpoint = baseUrl + "/admin/users/search?name=" + name + "&surname=" + surname + "&email=";
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

        public void UpdateStatus(int i, User user)
        {
            string endpoint = baseUrl + "/admin/users/updateStatus/" + user.Id;
            string access_token = Globals.LoggedInUser.AccessToken;
            using (var client = new WebClient())
            {
                client.Headers.Add(HttpRequestHeader.ContentType, "application/json");
                client.Headers.Add("x-access-token", access_token);
                client.UploadString(endpoint, "POST", @"{" + "\n" + @"    ""status"" : " + i + "\n" + @"}");
            }
        }

        public void DeleteUser(User user)
        {
            string endpoint = baseUrl + "/users/deleteUser/" + user.Id;
            string access_token = Globals.LoggedInUser.AccessToken;
            using (var client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json";
                client.Headers["x-access-token"] = access_token;
                client.UploadString(endpoint, "DELETE", "");
            }
        }

        public string GetLogOfAnUser(User user)
        {
            string endpoint = baseUrl + "/getlast100LogsByUser/" + user.Id;
            string access_token = Globals.LoggedInUser.AccessToken;
            using (var client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json";
                client.Headers["x-access-token"] = access_token;
                return client.DownloadString(endpoint);
            }
        }

        public string GetLastLogin(User user)
        {
            string endpoint = baseUrl + "/getLastLogin/" + user.Id;
            string access_token = Globals.LoggedInUser.AccessToken;
            using (var client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json";
                client.Headers["x-access-token"] = access_token;
                return client.DownloadString(endpoint);
            }
        }

        public string GetHistory()
        {
            string endpoint = baseUrl + "/gethistories/get100";
            string access_token = Globals.LoggedInUser.AccessToken;
            using (var client = new WebClient())
            {
                client.Headers["Content-Type"] = "application/json";
                client.Headers["x-access-token"] = access_token;
                return client.DownloadString(endpoint);
            }
        }
    }
}
