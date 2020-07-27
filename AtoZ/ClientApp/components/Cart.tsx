



import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';


interface RetrieveAllProducts {
   // product_List: Products_data;
   product_List: Array<any>;
   
	
}

export class Cart extends React.Component<RouteComponentProps<{}>, RetrieveAllProducts> {
 constructor(props) {
        super(props)
    
	
			
	
	var toDoItems = ['one', 'two', 'three'];
	  {this.setState({ product_List: toDoItems });}
			 
			this.handleDropdownChange = this.handleDropdownChange.bind(this);



}



handleDropdownChange(e) {
 
   var array_value_id=""+e.target.value;
	var nameArr = array_value_id.split(',');
	var value=nameArr[0];
	var id=nameArr[1];
	
	var newPrice=parseFloat(localStorage.getItem(id+"cartAto_Item_Price")!) * parseInt(value);
	localStorage.setItem(id+'cartAto_Item_Price_new', ""+newPrice);
	localStorage.setItem(id+'cartAto_Item_Quantity', value);
	   	              


							window.location.reload(false);



  }



 private removeItem(id) {
     
	  
	  var toDoItems = [''];
	const arrayitems = localStorage.getItem("cartAtoZID")!;
	var newlist="";
	var nameArr = arrayitems.split(',');
	
	for(var i=0;i<nameArr.length-1;i++)
	{
	if(nameArr[i]==id)
	{

     			 localStorage.removeItem(id+'cartAto_Item_ID');
				 localStorage.removeItem(id+'cartAto_Item_Name');
				 localStorage.removeItem(id+'cartAto_Item_Price');
				  localStorage.removeItem(id+'cartAto_Item_Price_new');
				 localStorage.removeItem(id+'cartAto_Item_Quantity');
				 localStorage.removeItem(id+'cartAto_Item_Image');

				 localStorage.answer = JSON.stringify(localStorage.getItem("count")!);
                let saved = JSON.parse(localStorage.answer);
                var myInt = parseInt(saved)-1;

				localStorage.setItem("count", ""+myInt);

				var total=parseFloat(localStorage.getItem('cartAto_carttotal')!)-parseFloat(localStorage.getItem('cartAto_Item_Price_new')!);
				 localStorage.setItem('cartAto_carttotal',""+total);


	
	}
	else
	{
	newlist += nameArr[i]+",";
	}
	}

	 localStorage.setItem('cartAtoZID',newlist);

	 window.location.reload(false);

    }

	private placeorder()
	{

	  const copyCartObj2 = localStorage.getItem("cartAtoZID")!;
	    	if((copyCartObj2=="")||( copyCartObj2==null))
			{
			     alert("Cart Empty"+copyCartObj2);
			
			}
			else
			{
			alert("Order Placed"+copyCartObj2);
			
			}

		
	}
















public render() {



var toDoItems = [''];
	const arrayitems = localStorage.getItem("cartAtoZID")!;
	var nameArr=[''];
	if(arrayitems!=null)
	{
	nameArr = arrayitems.split(',');
	}
	else
	{
	
	}
	
	for(var i=0;i<nameArr.length-1;i++)
	{
	toDoItems[i]= nameArr[i];
	 }
	 

	var nHTML = '';
	var total=0.0;
	 for(var i=0;i<nameArr.length-1;i++)
	
	 {
	    nHTML += '<li>' + nameArr[i] + '</li>';
		

		 if(parseFloat(localStorage.getItem(nameArr[i]+"cartAto_Item_Price")!) == parseFloat(localStorage.getItem(nameArr[i]+"cartAto_Item_Price_new")!))
		 {
		 localStorage.setItem(nameArr[i]+'cartAto_Item_Price_new', localStorage.getItem(nameArr[i]+"cartAto_Item_Price")!);
		 }

		 var cnt=parseInt(localStorage.getItem("count")!);
		 var qty=parseInt(localStorage.getItem(nameArr[i]+"cartAto_Item_Quantity")!);

		 if(( cnt==1) && (qty==1))
		 {
		 		 localStorage.setItem(nameArr[i]+'cartAto_Item_Price_new', localStorage.getItem(nameArr[i]+"cartAto_Item_Price")!);

		 }

		 var actualPrice=parseFloat(localStorage.getItem(nameArr[i]+"cartAto_Item_Price")!);
		 var newPrice=parseFloat(localStorage.getItem(nameArr[i]+"cartAto_Item_Price")!) * qty;


	localStorage.setItem(nameArr[i]+'cartAto_Item_Price_new', ""+newPrice);









		  total +=parseFloat(localStorage.getItem(nameArr[i]+"cartAto_Item_Price_new")!);
		 localStorage.setItem('cartAto_carttotal',""+total);

  }
  const arrayitemsch = localStorage.getItem("cartAtoZID")!;
  if((arrayitemsch=="") || (arrayitemsch==null))
  {
  return <div>
  
            <h1>Cart Empty</h1>
            <p>There is nothing in your cart!</p>
            <p> <div id="item-list"> </div>
                <Link to="/">Continue Shopping</Link>
            </p>
  
  </div>
  }
  else{

        return <div>
            <h1>Cart</h1>
            <h4>Your cart items</h4>
            
			
			

			<table className='table text-center'>
            <thead>
                <tr >
                    
                    <th className='text-center'>Product Id</th>
                    <th className='text-center'>Product</th>
					<th className='text-center'>Price</th>
                    <th className='text-center'>Quantity</th>
                    <th className='text-center'>Image</th>
					<th></th>
                   
                </tr>
            </thead>
			 {toDoItems.map(c =>
			 
        
		 <tr key={c}>
                                <td>{localStorage.getItem(c+"cartAto_Item_ID")!}</td>
								<td> {localStorage.getItem(c+"cartAto_Item_Name")!}</td>
								<td> {localStorage.getItem(c+"cartAto_Item_Price_new")!}</td>
								<td>
								
								<select className="form-control" onChange={this.handleDropdownChange}  data-val="true" name="pCategory" defaultValue={localStorage.getItem(c+"cartAto_Item_Quantity")!} required>
                             <option selected value={`1,${c}`}>{localStorage.getItem(c+"cartAto_Item_Quantity")!}</option>
							<option value={`1,${c}`}>1</option>
							<option value={`2,${c}`}>2</option>
							<option value={`3,${c}`}>3</option>
							<option value={`4,${c}`}>4</option>
							<option value={`5,${c}`}>5</option>                         
						   						
                        </select>
						</td>
						<td> <img src={`/Uploads/${localStorage.getItem(c+"cartAto_Item_Image")!}`} height="50" width="50" /></td>
						<td><button onClick={() => this.removeItem(c)}>Remove Item</button></td>
						</tr>
        
			 
						
                            )}
							
							

			
			</table>

			<div className="col-md-12">
			<div className="col-md-1"></div><div className="col-md-9"></div><div className="col-md-2">
			<div className="col-md-12 "> Items In Cart: {localStorage.getItem("count")!}</div>
							<div className="col-md-12 "> Total Amount: ${localStorage.getItem("cartAto_carttotal")!}</div>
						
						
					



						<div className='col-md-12 text-right'>
		<a href="/Order" className="btn btn-warning btn-lg">
          <span className="glyphicon glyphicon-shopping-cart"></span> Checkout
        </a>

		  
</div>


						
			</div>
			</div>

			

			<div>
			
			</div>
			  <div>
			</div>
			
          
        </div>
		}
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

