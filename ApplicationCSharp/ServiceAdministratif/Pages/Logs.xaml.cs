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

        private void InitTab(string li, string li2)
        {
            dgLogs.ItemsSource = JsonConvert.DeserializeObject<List<Log>>(li);
            List<Log> res = JsonConvert.DeserializeObject<List<Log>>(li2);
            if(res.Count > 0)
            {
                lastLogin.Text = "Dernière connexion : " + res[0].CreatedAt;
            }  else
            {
                lastLogin.Text = "Dernière connexion : jamais";
            }
            
        }

        public static void InitialTab(string li, string li2)
        {
            instance.InitTab(li, li2);
            MainWindow.ShowLog();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            MainWindow.HideLog();
        }

        //private void btnExport_Click(object sender, RoutedEventArgs e)
        //{
        //    Microsoft.Office.Interop.Excel.Application excel = null;
        //    Microsoft.Office.Interop.Excel.Workbook wb = null;
        //    object missing = Type.Missing;
        //    Microsoft.Office.Interop.Excel.Worksheet ws = null;
        //    Microsoft.Office.Interop.Excel.Range rng = null;

        //    // collection of DataGrid Items
        //    var dtExcelDataTable = ExcelTimeReport(txtFrmDte.Text, txtToDte.Text, strCondition);

        //    excel = new Microsoft.Office.Interop.Excel.Application();
        //    wb = excel.Workbooks.Add();
        //    ws = (Microsoft.Office.Interop.Excel.Worksheet)wb.ActiveSheet;
        //    ws.Columns.AutoFit();
        //    ws.Columns.EntireColumn.ColumnWidth = 25;

        //    // Header row
        //    for (int Idx = 0; Idx < dtExcelDataTable.Columns.Count; Idx++)
        //    {
        //        ws.Range["A1"].Offset[0, Idx].Value = dtExcelDataTable.Columns[Idx].ColumnName;
        //    }

        //    // Data Rows
        //    for (int Idx = 0; Idx < dtExcelDataTable.Rows.Count; Idx++)
        //    {
        //        ws.Range["A2"].Offset[Idx].Resize[1, dtExcelDataTable.Columns.Count].Value = dtExcelDataTable.Rows[Idx].ItemArray;
        //    }

        //    excel.Visible = true;
        //    wb.Activate();
        //}
    }
}
