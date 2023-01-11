using ServiceAdministratif.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ServiceAdministratif.Pages
{
    /// <summary>
    /// Logique d'interaction pour Login.xaml
    /// </summary>
    public partial class Login : UserControl
    {
        public Login()
        {
            InitializeComponent();
        }

        private void btnLogin_Click(object sender, RoutedEventArgs e)
        {
            string email = tbxUsername.Text;
            string password = pbxPassword.Password;

            ApiOperations ops = new ApiOperations();
            User user = ops.AuthenticateUser(email, password);
            if (user == null)
            {
                MessageBox.Show("Mot de passe ou identifiant invalide");
                return;
            }
            tbxUsername.Text = "";
            pbxPassword.Password = "";
            Globals.LoggedInUser = user;
            MessageBox.Show("Vous êtes connecté");
            MainWindow.ChangeMenu();
            Home.InitGridStatic();
        }
    }
}
