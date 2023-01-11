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
    /// Logique d'interaction pour Home.xaml
    /// </summary>
    public partial class Home : UserControl
    {
        private static Home instance;
        public Home()
        {
            InitializeComponent();
            instance = this;
        }

        public void InitGrid()
        {
            ApiOperations api = new ApiOperations();
            dgUsers.ItemsSource = api.GetAllUsers();
        }

        public static void InitGridStatic()
        {
            instance.InitGrid();
        }
    }
}
