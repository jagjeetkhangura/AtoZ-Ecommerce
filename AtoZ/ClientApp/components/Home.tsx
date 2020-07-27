import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

interface RetrieveAllProducts {
    product_List: Products_data[];
    loading: boolean;
	cartvalue:"";
	
}


export class Home extends React.Component<RouteComponentProps<{}>, RetrieveAllProducts> {
 constructor(props) {
        super(props)
    



		this.state = { product_List: [], loading: true,cartvalue: Cookies.get('count') };		
		fetch('api/Products/AllProducts_List')
		  .then(response => response.json() as Promise<Products_data[]>)
		    .then(data => 
		     {this.setState({ product_List: data, loading: false,cartvalue: Cookies.get('count') });}
			 );

          this.handleAddToCart = this.handleAddToCart.bind(this);
		    this.addtocartmethod = this.addtocartmethod.bind(this);
		  







		  }


		  private addtocartmethod(id,name,price,image) {
  	
			var testObject='{"CartProducts":[]}';
			const copyCartObj1 = localStorage.getItem("count")!;
	
			const copyCartObj2 = localStorage.getItem("cartAtoZID")!;
	    	if(copyCartObj2==null)
			{
		    	 
				 localStorage.setItem('cartAtoZID', id+",");

				 localStorage.setItem("count", JSON.stringify(1));



				 localStorage.setItem(id+'cartAto_Item_ID', id);
				 localStorage.setItem(id+'cartAto_Item_Name', name);
				 localStorage.setItem(id+'cartAto_Item_Price', price);
				 localStorage.setItem(id+'cartAto_Item_Quantity', "1");
				 localStorage.setItem(id+'cartAto_Item_Image', image);

        	}
		    else
		    {

			     const localarry = localStorage.getItem("cartAtoZID")!;
				 const arr1 = localarry.split(',');
				 var result = 0;
				 for(var i=0;i<arr1.length-1;i++)
				 {
				 	 if(arr1[i]==id)
					 {
					 result++;
					 
					 }
				 }
	
	             if(result>0)
				 {
				 alert("Item Already in Cart");
				 
				 }
				 else{
				 var retrievedObjectwID = localStorage.getItem('cartAtoZID')!;

				 localStorage.setItem('cartAtoZID', retrievedObjectwID+""+id+",");
				
				localStorage.answer = JSON.stringify(localStorage.getItem("count")!);
                let saved = JSON.parse(localStorage.answer);
                var myInt = parseInt(saved)+1;
				localStorage.setItem("count", ""+myInt);


				 localStorage.setItem(id+'cartAto_Item_ID', id);
				 localStorage.setItem(id+'cartAto_Item_Name', name);
				 localStorage.setItem(id+'cartAto_Item_Price', price);
				 localStorage.setItem(id+'cartAto_Item_Quantity', "1");
				 localStorage.setItem(id+'cartAto_Item_Image', image);


				}
			}


			const arraynotnull = localStorage.getItem("cartAtoZID")!;
	    	if(arraynotnull!=null)
			{
	const arrayitems = localStorage.getItem("cartAtoZID")!;
	var nameArr = arrayitems.split(',');
	

}
		
		
		 this.setState({ cartvalue: Cookies.get('count')});





  }




	public render() {




    let  Data_from_DB = this.state.loading
            ? <p><em>Content Loading...</em></p>
            : this.renderProducts(this.state.product_List);

        return <div>
            <h1>AtoZ</h1>
            <h4>E-commerce platform</h4>
            
			
			<a href="/Cart"  className="">
          
			<div className="cartclass">
			<span className='wdth glyphicon glyphicon-shopping-cart'>   </span><span>   </span> {localStorage.getItem("count")!}
			</div>
			
        </a>
			
            { Data_from_DB}
        </div>;
    }

	

	
	

    private handleAddToCart(id: number) {     	
        
		//alert("cart clear");
		

		localStorage.clear();
		window.location.reload(false);

		
           
        }


		
		

	 private renderProducts(product_List: Products_data[]) {

	 
	 


        return <div>
		{product_List.map(p =>

		<div  className='boxshadow product_id col-md-3'>
		<div className='col-md-12 text-center'>
		<img className='product_id_Image' src={`/Uploads/${p.pImage}`} />
		</div>
		<div className='distance col-md-12 text-center'>{p.pName}</div>
		<div className='pprc col-md-12 text-center'>${p.pPrice}</div>
		<div className='descr col-md-12 text-center'>{p.pDescription}</div>
		
		<div className='col-md-12 text-center'>
		<a href="#" onClick={() => this.addtocartmethod(p.productId,p.pName,p.pPrice,p.pImage)} className="btn btn-info btn-lg">
          Add to <span className="glyphicon glyphicon-shopping-cart"></span>
        </a>

		  
</div>

		 
		</div>)}
</div>








    
    }
}






export class Products_data {
    productId: number = 0;
    pName: string = "";
	pDescription: string = "";
    pPrice: string = "";
    pCategory: string = "";
    pImage: string = "";
	pInstock: string = "";
	
} 
