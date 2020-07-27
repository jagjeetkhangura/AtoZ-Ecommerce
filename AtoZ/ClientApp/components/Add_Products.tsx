
import * as React from 'react';
import axios from 'axios'; 

import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Products_data } from './Get_Products';
import { withRouter } from 'react-router-dom';




interface AddEmployeeDataState {
    title: string;
    loading: boolean;
	categories_data: Array<any>;
    productdata: Products_data;
	filesToBeSent:  Array<any>;
}

export class Add_Products extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, categories_data: [], productdata: new Products_data,filesToBeSent:[] };

        fetch('api/Products/ProductCategoryList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ categories_data: data });
            });

       var Product_ID = this.props.match.params["productid"];
	 
	 
 
        
        if (Product_ID> 0) {
            fetch('api/Products/OneProduct_Detail/' + Product_ID)
                .then(response => response.json() as Promise<Products_data>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, productdata: data });
                });
        }

        // This will set state for Add Product
        else {
            this.state = { title: "Add", loading: false, categories_data: [], productdata: new Products_data,filesToBeSent:[] };
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.categories_data);

        return <div>
            <h1>AtoZ</h1>
            <h3>{this.state.title} Products</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const form_data = new FormData(event.target);

        // PUT request for Edit Product
        if (this.state.productdata.productId) {
            fetch('api/Products/EditProductDetail', {
                method: 'PUT',
                body: form_data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/getproducts");
                })
        }

        // Post Product Data Fields to Database Table.
        else {
            fetch('api/Products/PostProductDetailsToDB', {
                method: 'POST',
                body: form_data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/getproducts");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/getproducts");
    }
	
	
	
   
  

    // Returns the HTML Form to the render() method.
    private renderCreateForm(categories_data: Array<any>) {
        return (

		

            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="productId" value={this.state.productdata.productId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name(Max 20)</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="pName"  maxLength={20} defaultValue={this.state.productdata.pName} required />
                    </div>
                </div >
				< div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Description</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="pDescription" defaultValue={this.state.productdata.pDescription} required />
                    </div>
                </div >
				< div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Price</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="pPrice" defaultValue={this.state.productdata.pPrice} required />
                    </div>
                </div >
				<div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Category">Category</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="pCategory" defaultValue={this.state.productdata.pCategory} required>
                            <option value="aa">-- Select Category --</option>
                            {categories_data.map(c =>
                                <option key={c.categoryId} value={c.categoryName}>{c.categoryName}</option>
                            )}
						   						
                        </select>
                    </div>
                </div >

				<div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Image</label>
                    <div className="col-md-4">
                        

						   <input  className="form-control" required type="file" name="pImage" multiple />


                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">In Stock</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="pInstock" defaultValue={this.state.productdata.pInstock} required>
                            
                            <option value="Yes" selected>Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div >
              

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >

            </form >
        )
    }
}
