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
using Newtonsoft.Json;
using ServiceAdministratif.Models;


namespace ServiceAdministratif.Pages
{
    /// <summary>
    /// Logique d'interaction pour Order.xaml
    /// </summary>
    public partial class Order : UserControl
    {
        private ApiOperations api = new ApiOperations();
        public static Order instance;

        public Order()
        {
            instance = this;
            InitializeComponent();
        }

        public void InitGrid()
        {
            dgOrder.ItemsSource = JsonConvert.DeserializeObject<List<History>>(api.GetHistory());
        }

        public static void CallGrid()
        {
            instance.InitGrid();
        }
    }
}
