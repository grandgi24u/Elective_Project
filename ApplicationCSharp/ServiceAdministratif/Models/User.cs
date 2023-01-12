using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceAdministratif.Models
{
    class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public int Status { get; set; }
        public string StatusMes
        {
            get
            {
                string res = "";
                switch (Status)
                {
                    case (0):
                        res = "Normal";
                        break;
                    case (1):
                        res = "Suspendu";
                        break;
                }
                return res;
            }
        }
        public string CodePar { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string AccessToken { get; set; }

    }
}
