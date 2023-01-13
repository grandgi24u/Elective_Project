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
    /// Logique d'interaction pour Logs.xaml
    /// </summary>
    public partial class Logs : UserControl
    {

        public static Logs instance;
        public Logs()
        {
            InitializeComponent();
            instance = this;
        }

        private void InitTab(string li)
        {
            dgLogs.ItemsSource = JsonConvert.DeserializeObject<List<Log>>(li); 
        }

        public static void InitialTab(string li)
        {
            instance.InitTab(li);
            MainWindow.ShowLog();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            MainWindow.HideLog();
        }
    }
}
