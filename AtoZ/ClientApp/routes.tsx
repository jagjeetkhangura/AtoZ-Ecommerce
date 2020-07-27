
import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { Get_Products } from './components/Get_Products';
import { Add_Products } from './components/Add_Products';

import { Cart } from './components/Cart';
import { PlaceOrder } from './components/PlaceOrder';


export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    

	 <Route path='/getproducts' component={ Get_Products } />
    <Route path='/addproducts' component={ Add_Products } />
	  
	  <Route path='/cart' component={ Cart } />
	  <Route path='/order' component={ PlaceOrder } />
	<Route path='/urlproducts/editProductDetail/:productid' component={Add_Products} />
	
</Layout>;
