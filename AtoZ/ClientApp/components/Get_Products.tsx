import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface RetrieveAllProducts {
    product_List: Products_data[];
    loading: boolean;
}

export class Get_Products extends React.Component<RouteComponentProps<{}>, RetrieveAllProducts> {
 constructor() 
    {
        super();
		this.state = { product_List: [], loading: true };		
		fetch('api/Products/AllProducts_List')
		  .then(response => response.json() as Promise<Products_data[]>)
		    .then(data => 
		     {this.setState({ product_List: data, loading: false });}
			 );

	      // This binding is necessary to make "this" work in the callback
          this.handleDelete = this.handleDelete.bind(this);
          this.handleEdit = this.handleEdit.bind(this);
		  
		  }










	public render() {
    let  Data_from_DB = this.state.loading
            ? <p><em>Content Loading...</em></p>
            : this.renderProducts(this.state.product_List);

        return <div>
            <h1>AtoZ</h1>
            <p>List of products</p>
           
            { Data_from_DB}
        </div>;
    }

	// Handle Delete request for a product
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete this product: " + id))
            return;
        else {
            fetch('api/Products/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        product_List: this.state.product_List.filter((rec) => {
                            return (rec.productId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
     
	     this.props.history.push("/urlproducts/editProductDetail/" + id);

	
    }

    // Returns the HTML table to the render() method.
	 private renderProducts(product_List: Products_data[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Product Id</th>
                    <th>Product Name</th>
					<th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
					<th>In Stock</th>
                </tr>
            </thead>
            <tbody>
                {product_List.map(p =>
                    <tr key={p.productId}>
                        <td></td>
                        <td>{p.productId}</td>
                        <td>{p.pName}</td>
						<td>{p.pDescription}</td>
                        <td>{p.pPrice}</td>
                        <td>{p.pCategory}</td>
                        <td><img src={`/Uploads/${p.pImage}`} height="100"  width="100" />   </td>
						<td>{p.pInstock}</td>
                        <td>
                            <a id="edt" className="cursor_class action" onClick={(id) => this.handleEdit(p.productId)}>Edit</a>  |
                            <a className="cursor_class action" onClick={(id) => this.handleDelete(p.productId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
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