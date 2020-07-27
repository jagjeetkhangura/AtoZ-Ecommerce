using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AtoZ.Models
{
    public class CartList
    {
        public long ProductId { get; set; }
        public string PName { get; set; }
        public string PDescription { get; set; }
        public string PPrice { get; set; }
        public string PCategory { get; set; }
        public string PImage { get; set; }
        public string PInstock { get; set; }
    }
}
