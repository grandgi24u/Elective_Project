using ServiceAdministratif.Models;
using ServiceAdministratif.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ServiceAdministratif
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static MainWindow instance;

        public MainWindow()
        {
            instance = this;
            InitializeComponent();
            loadMenu();
        }

        public void loadMenu()
        {
            if (Globals.LoggedInUser != null)
            {
                btnLogin.Visibility = Visibility.Collapsed;
                btnLogout.Visibility = Visibility.Visible;
                btnHome.Visibility = Visibility.Visible;
                LoginPage.Visibility = Visibility.Collapsed;
                HomePage.Visibility = Visibility.Visible;
                
            } else
            {
                LogsPage.Visibility = Visibility.Collapsed;
                btnHome.Visibility = Visibility.Collapsed;
                btnLogout.Visibility = Visibility.Collapsed;
                btnLogin.Visibility = Visibility.Visible;
                HomePage.Visibility = Visibility.Collapsed;
                LoginPage.Visibility = Visibility.Visible;
            }
            FetchUserDetails();
        }

        private void FetchUserDetails()
        {
            if(Globals.LoggedInUser == null)
            {
                HideUserInfos();
                return;
            }
            ApiOperations ops = new ApiOperations();
            User user = ops.GetUserDetails(Globals.LoggedInUser);
            if (user == null)
            {
                HideUserInfos();
                MessageBox.Show("Session expired");
            }
            Globals.LoggedInUser = user;
            ShowUserInfos();
        }

        private void ShowUserInfos()
        {
            SurnameLabel.Visibility = Visibility.Visible;
            NameLabel.Visibility = Visibility.Visible;
            SurnameLabel.Content = Globals.LoggedInUser.Surname;
            NameLabel.Content = Globals.LoggedInUser.Name;
        }

        private void HideUserInfos()
        {
            SurnameLabel.Visibility = Visibility.Collapsed;
            NameLabel.Visibility = Visibility.Collapsed;
        }

        private void btnLogout_Click(object sender, RoutedEventArgs e)
        {
            Globals.LoggedInUser = null;
            MainWindow.ChangeMenu();
        }

        private void btnHome_Click(object sender, RoutedEventArgs e)
        {
            LoginPage.Visibility = Visibility.Collapsed;
            HomePage.Visibility = Visibility.Visible;
            LogsPage.Visibility = Visibility.Collapsed;
            Home.InitGridStatic();
        }

        private void btnLogin_Click(object sender, RoutedEventArgs e)
        {
            HomePage.Visibility = Visibility.Collapsed;
            LoginPage.Visibility = Visibility.Visible;
        }

        private void ShowLogPage()
        {
            HomePage.Visibility = Visibility.Collapsed;
            LogsPage.Visibility = Visibility.Visible;
        }

        private void HideLogPage()
        {
            HomePage.Visibility = Visibility.Visible;
            LogsPage.Visibility = Visibility.Collapsed;
        }

        public static void ChangeMenu()
        {
            MainWindow.instance.loadMenu();
        }

        public static void ShowLog()
        {
            MainWindow.instance.ShowLogPage();
        }

        public static void HideLog()
        {
            MainWindow.instance.HideLogPage();
        }
    }
}
