import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {




    public render() {
        return <div className='main-nav  nav_layout'>
                <div className='navbar navbar-inverse col-sm-2'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>AtoZ</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                       
						<li>
                            <NavLink to={ '/getproducts' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Manage Products
                            </NavLink>
                        </li>
						<li>
                            <NavLink to={ '/addproducts' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Add Product
                            </NavLink>
                        </li>
						

						<li>
                            <NavLink to={ '/cart' } activeClassName='active'>
                                <span className='glyphicon glyphicon-shopping-cart'></span>Cart Items {localStorage.getItem("count")!} 


                            </NavLink>
                        </li>
						




                    </ul>
									
<div className="footera text-center">
<div><span className="">AtoZ Electronics.</span></div>
<div><span className="">Address:  </span></div>
<div><span className="">Phone: (999) 999-9999 </span></div>


</div>
                </div>
				
            </div>

			

			
        </div>;
    }
}
