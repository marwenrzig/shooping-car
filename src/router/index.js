import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '/src/views/ProductList.vue'
import ShoopingCart from '/src/views/ShoopingCart.vue'
import ProductDetails from '../views/ProductDetails.vue'
import DefaultLayout from '/src/layouts/DefaultLayout.vue'
const routes = [
    {
        path:'/',
        name:'Public',
        component:DefaultLayout,
        redirect: '/',
        children:[
            {
                path:'/',
                name:'ProductList',
                component:ProductList
            },
            {
                path:'/product/:id',
                name:'ProductDetails',
                component:ProductDetails
            },
            {
                path:'/cart',
                name:'ShoopingCart',
                component:ShoopingCart
            }
        ]
    },
]   
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router