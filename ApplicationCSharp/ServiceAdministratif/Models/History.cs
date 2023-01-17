using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceAdministratif.Models
{
    class History
    {
        public string Id { get; set; }
        public string[] Id_menus { get; set; }
        public string[] Id_items { get; set; }
        public string Order_price { get; set; }
        public DateTime Order_date { get; set; }
        public string RestaurantId { get; set; }
        public string DeliveryId { get; set; }
        public string UserId { get; set; }
    }
}
