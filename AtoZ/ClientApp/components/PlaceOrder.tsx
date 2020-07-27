



import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';



export class PlaceOrder extends React.Component<RouteComponentProps<{}>> {
 constructor(props) {
        super(props)
    
	



}







 private removeItem(id) {
     
	  
	
	

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
			

			localStorage.clear();
			alert("Your Order Placed Succfully");
			
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
  if(arrayitemsch=="")
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
            <h4>Complete your order</h4>
           
			
			

			<table className='table text-center'>
            <thead>
                <tr >                   
                    
                    <th className='text-center'>Product</th>
					<th className='text-center'>Quantity</th>
					<th className='text-center'>Price</th>                  
                </tr>
            </thead>
			 {toDoItems.map(c =>
			 
        
		 <tr className="row_border" key={c}>
                               
								<td> {localStorage.getItem(c+"cartAto_Item_Name")!}</td>
								<td>{localStorage.getItem(c+"cartAto_Item_Quantity")!}</td>
								<td> {localStorage.getItem(c+"cartAto_Item_Price_new")!}</td>
								
						
						
						</tr>
        
			 
						
                            )}
							
							

			
			</table>

			<div className="col-md-12">
			<div className="col-md-12">
			
			<div className="col-md-12 text-right finalamount "> Total Amount: ${localStorage.getItem("cartAto_carttotal")!}</div>
				

				<div className="col-md-12 text-center form-distance" >Dummy order placement form.Click on place your order.</div>

				<div className="col-md-12 text-center form-distance" >
					<input className="form-control" type="text" name="pName" placeholder="Enter your name"   required />
                </div>
				<div className="col-md-12 text-center form-distance" >
					<input className="form-control" type="text" name="pName" placeholder="Phone Number"  required />
                </div>
				<div className="col-md-12 text-center form-distance" >
					<input className="form-control" type="text" name="pName" placeholder="Address"  required />
                </div>
				<div className="col-md-12 text-center form-distance" >
					<input className="form-control" type="text" name="pName" placeholder="Email"  required />
                </div>
				
				
				<div className='col-md-12 text-right'>
		<a href="/" onClick={() => this.placeorder()} className="btn btn-info btn-lg">
          <span className="glyphicon glyphicon-shopping-cart"></span> Place Your Order
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