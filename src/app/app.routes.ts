import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Products } from './pages/products/products';
import { Brands } from './pages/brands/brands';
import { Categories } from './pages/categories/categories';
import { Details } from './pages/details/details';
import { Checkout } from './pages/checkout/checkout';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './core/guards/auth-guard';
import { loggedInGuard } from './core/guards/logged-in-guard';
import { AllOrders } from './pages/all-orders/all-orders/all-orders';
import { ForgetPassword } from './pages/forget-password/forget-password';

export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch:'full'},

    {path: "", component:AuthLayout, canActivate:[loggedInGuard] ,children:[
        {path: 'login', component:Login, title: 'Login page'},
        {path: 'register', component:Register, title: 'Register page'},
        {path: 'forgotpass', component:ForgetPassword, title: 'Forgot Password page'}
    ]},
    {path:"", component:MainLayout,  canActivate:[authGuard], children:[
        {path: 'home', component:Home, title: 'Home'},
        {path: 'cart', component: Cart, title: 'Cart'},
        {path: 'products', component:Products, title: 'Products'},
        {path: 'brands', component:Brands, title: 'Brands'},
        {path: 'categories', component:Categories, title: 'Categories'},
        {path: 'allorders', component:AllOrders, title: 'All Orders'},
        {path: 'details/:id', component:Details, title: 'Details'},
        {path: 'checkout/:cartId', component:Checkout, title: 'Checkout'}
    ]},

    {path:'**', component: NotFound, title:'Not Found!'}

];
