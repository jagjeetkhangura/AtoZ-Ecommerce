using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace AtoZ.Models
{
    
    public class Products_CRUD
    {
        AtoZ_DbContext db_con = new AtoZ_DbContext();
       
        public IEnumerable<TblProducts> GetAllProducts()
        {
            try
            {
              
                return db_con.TblProducts.ToList();
            }
            catch (Exception e)
            {
                throw;
            }
        }


        //Getting Product Categories List
        public List<TblCategory> GetCategory()
        {
            List<TblCategory> cate = new List<TblCategory>();
            cate = (from C_List in db_con.TblCategory select C_List).ToList();

            return cate;
        }

        //Add New Product Detail To DataBase
        public int AddProduct(TblProducts Tbl_pro_obj)
        {
            try
            {

              

                db_con.TblProducts.Add(Tbl_pro_obj);
                db_con.SaveChanges();
               
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get Product detail from database
        public TblProducts GetProductData(int id)
        {
            try
            {
                long id_long = Convert.ToInt64(id);
                TblProducts Tbl_pro_obj = db_con.TblProducts.Find(id_long);
                return Tbl_pro_obj;
            }
            catch
            {
                throw;
            }
        }

        //Product Update..
        public int Product_Update(TblProducts Tbl_pro_obj)
        {
            try
            {
                db_con.Entry(Tbl_pro_obj).State = EntityState.Modified;
                db_con.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Delete selected product
        public int Del_Product(int id)
        {
            try
            {
                long idof_product = Convert.ToInt64(id);
                TblProducts emp = db_con.TblProducts.Find(idof_product);
                db_con.TblProducts.Remove(emp);
                db_con.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }


    }
}
