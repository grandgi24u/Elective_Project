using Newtonsoft.Json;
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
        private ApiOperations api = new ApiOperations();
        public Home()
        {
            InitializeComponent();
            instance = this;
        }

        public void InitGrid()
        {
            dgUsers.ItemsSource = api.GetAllUsers();
        }

        public static void InitGridStatic()
        {
            instance.InitGrid();
        }

        private void UpdateData()
        {
            dgUsers.ItemsSource = api.SearchForUser(txtForName.Text, txtForSurName.Text);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            UpdateData();
        }

        private void Suspendre(object sender, RoutedEventArgs e)
        {
            User obj = ((FrameworkElement)sender).DataContext as User;
            api.UpdateStatus(1, obj);
            UpdateData();
        }

        private void Normal(object sender, RoutedEventArgs e)
        {
            User obj = ((FrameworkElement)sender).DataContext as User;
            api.UpdateStatus(0, obj);
            UpdateData();
        }

        private void Supprimer(object sender, RoutedEventArgs e)
        {
            User obj = ((FrameworkElement)sender).DataContext as User;
            if (MessageBox.Show("Etes vous sur de supprimer " + obj.Name  + "?", "Question", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.Yes)
            {
                api.DeleteUser(obj);
                UpdateData();
            }
        }

        private void AskLog(object sender, RoutedEventArgs e)
        {
            User obj = ((FrameworkElement)sender).DataContext as User;
            Logs.InitialTab(api.GetLogOfAnUser(obj), api.GetLastLogin(obj));
        }
    }
}
