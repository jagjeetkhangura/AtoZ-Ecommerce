using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AtoZ.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Microsoft.Extensions.FileProviders;





using Microsoft.AspNetCore.Hosting.Internal;




//using Microsoft.Extensions.Hosting;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AtoZ.Controllers
{
    public class ProductsController : Controller
    {
        Products_CRUD obj_Product= new Products_CRUD();
        // GET: /<controller>/

        private IHostingEnvironment Environment;

        public ProductsController(IHostingEnvironment _environment)
        {
            Environment = _environment;
        }

        //[HttpPost]
        //[Route("api/Products/uploqad")]
        //public async Task<IActionResult> Upload(FileUploadViewModel model)
        //{
        //    var file = model.File;

        //    if (file.Length > 0)
        //    {
        //        string path = Path.Combine(_env.WebRootPath, "uploadFiles");
        //        using (var fs = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
        //        {
        //            await file.CopyToAsync(fs);
        //        }

        //        model.source = $"/uploadFiles{file.FileName}";
        //        model.Extension = Path.GetExtension(file.FileName).Substring(1);
        //    }
        //    return BadRequest();
        //}

        //[HttpPost]
        //[Route("api/Products/upload")]
        //public async Task<IActionResult> UploadFile(IFormFile filesToBeSent)
        //{
        //    if (filesToBeSent == null || filesToBeSent.Length == 0)
        //        return Content("file not selected");

        //    var path = Path.Combine(
        //                Directory.GetCurrentDirectory(), "wwwroot",
        //                filesToBeSent.GetFilename());

        //  //  Path.GetFileNameWithoutExtension(fileName).Slugify() + Path.GetExtension(fileName).ToLower();



        //    using (var stream = new FileStream(path, FileMode.Create))
        //    {
        //        await filesToBeSent.CopyToAsync(stream);
        //    }

        //    return RedirectToAction("Files");
        //   // return BadRequest();
        //}

        [HttpPost]
        [Route("api/Products/upload")]
        public IActionResult fileUploadAction(List<IFormFile> postedFiles)
        {
            string wwwPath = this.Environment.WebRootPath;
            string contentPath = this.Environment.ContentRootPath;

            string path = Path.Combine(this.Environment.WebRootPath, "Uploads");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            List<string> uploadedFiles = new List<string>();
            foreach (IFormFile postedFile in postedFiles)
            {
                string fileName = Path.GetFileName(postedFile.FileName);
                using (FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                    uploadedFiles.Add(fileName);
                    ViewBag.Message += string.Format("<b>{0}</b> uploaded.<br />", fileName);
                }
            }

            return View();
        }











        [HttpGet]
        [Route("api/Products/AllProducts_List")]
        public IEnumerable<TblProducts> Index()
        {

            string key = "count";
            int expireTime = 30;

            //CookieOptions option = new CookieOptions();
            //option.Expires = new DateTimeOffset(DateTime.Now.AddDays(expireTime));
          //  Response.Cookies.Append(key, "21", option);


            return obj_Product.GetAllProducts();
        }
        [HttpGet]
        [Route("api/Products/ProductCategoryList")]
        public IEnumerable<TblCategory> Categories_list()
        {
            return obj_Product.GetCategory();
        }

       


        

        [HttpPost]
        [Route("api/Products/PostProductDetailsToDB")]
        public int Create(TblProducts tbl_pro_obj, List<IFormFile> pImage)
        {

            string wwwPath = this.Environment.WebRootPath;
            string contentPath = this.Environment.ContentRootPath;

            string path = Path.Combine(this.Environment.WebRootPath, "Uploads");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            List<string> uploadedFiles = new List<string>();
            foreach (IFormFile postedFile in pImage)
            {
                string fileName = Path.GetFileName(postedFile.FileName);
                if ((postedFile != null) && (Path.GetExtension(postedFile.FileName) == ".jpg") || (Path.GetExtension(postedFile.FileName) == ".png") || (Path.GetExtension(postedFile.FileName) == ".jpeg"))
                {
                    string tme = DateTime.Now.ToString();
                    string qq = tme.Replace(":", "-");
                    string qq1 = qq.Replace("/", "-");
                    string wq = qq1+Guid.NewGuid() + fileName;
                    tbl_pro_obj.PImage = wq;
                    using (FileStream stream = new FileStream(Path.Combine(path, wq), FileMode.Create))
                    {
                        postedFile.CopyTo(stream);
                        uploadedFiles.Add(fileName);
                        ViewBag.Message += string.Format("<b>{0}</b> uploaded.<br />", fileName);
                    }
                    return obj_Product.AddProduct(tbl_pro_obj);
                }
                else
                {
                    // tbl_pro_obj.PImage = Path.GetExtension(postedFile.FileName);
                    return 0;
                }


                
                
            }

            return 0;

            
        }

       
        [HttpGet]
        [Route("api/Products/OneProduct_Detail/{id}")]
        public TblProducts Details(int id)
        {
            return obj_Product.GetProductData(id);
        }

        [HttpPut]
        [Route("api/Products/EditProductDetail")]
        public int Edit(TblProducts tbl_pro_obj, List<IFormFile> pImage)
        {

            string wwwPath = this.Environment.WebRootPath;
            string contentPath = this.Environment.ContentRootPath;

            string path = Path.Combine(this.Environment.WebRootPath, "Uploads");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            List<string> uploadedFiles = new List<string>();
            foreach (IFormFile postedFile in pImage)
            {
                string fileName = Path.GetFileName(postedFile.FileName);
                if ((postedFile != null) && (Path.GetExtension(postedFile.FileName) == ".jpg") || (Path.GetExtension(postedFile.FileName) == ".png") || (Path.GetExtension(postedFile.FileName) == ".jpeg"))
                {
                    string tme = DateTime.Now.ToString();
                    string qq = tme.Replace(":", "-");
                    string qq1 = qq.Replace("/", "-");
                    string wq = qq1+Guid.NewGuid() + fileName;
                    tbl_pro_obj.PImage = wq;
                    using (FileStream stream = new FileStream(Path.Combine(path, wq), FileMode.Create))
                    {
                        postedFile.CopyTo(stream);
                        uploadedFiles.Add(fileName);
                        ViewBag.Message += string.Format("<b>{0}</b> uploaded.<br />", fileName);
                    }
                    return obj_Product.Product_Update(tbl_pro_obj);
                }
                else
                {
                    // tbl_pro_obj.PImage = Path.GetExtension(postedFile.FileName);
                    return 0;
                }




            }

            return 0;
            
            
        }


        [HttpDelete]
        [Route("api/Products/Delete/{id}")]
        public int Delete(int id)
        {
            return obj_Product.Del_Product(id);
        }









    }
}
