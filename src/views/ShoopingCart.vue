<template>
    <section class="h-100 h-custom min-h-content">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card border-0">
                        <div class="card-body p-4">

                            <div class="row">
                                <div class="col-lg-7">
                                    <h5 class="mb-3"><router-link :to="{ name: 'ProductList' }" class="text-body"><i
                                                class="fas fa-long-arrow-alt-left me-2"></i>Continue
                                            shopping</router-link></h5>
                                    <hr>

                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <p class="mb-0">You have {{ $store.state.cart.length }} items in your cart
                                            </p>
                                        </div>
                                    </div>

                                    <div v-for="item in $store.state.cart" class="card mb-3 shadow-sm border-0"
                                        :key="item.id">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <router-link :to="`/product/${item.id}`">
                                                            <img :src="item.image" class="img-fluid rounded-3"
                                                                alt="Shopping item" style="width: 65px;">
                                                        </router-link>
                                                    </div>
                                                    <div class="ms-3 product-title">
                                                        <router-link :to="`/product/${item.id}`">{{ item.title
                                                            }}</router-link>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center">
                                                    <div>
                                                        <CartAddRemove :product="item" />
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center product-price">
                                                    <div>
                                                        <p class="mb-0"><i class="bi bi-currency-dollar"></i>{{
                                                            item.price * item.qty }}</p>
                                                        <small v-if="item.hasDiscount"
                                                            class="text-muted text-decoration-line-through"><i
                                                                class="bi bi-currency-dollar"></i>{{
                                                                    item.price }}</small>
                                                    </div>
                                                    <a role="button" @click="removeItem(item)" class="ms-4"
                                                        style="color: #cecece;"><i class="bi bi-trash3 h4"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-lg-5">

                                    <div class="card bg-secondary text-white rounded-0 border-0">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center mb-4">
                                                <h5 class="mb-0">Cart details</h5>
                                                <i class="bi bi-cart3 h1"></i>
                                            </div>
                                            <div v-for="item in $store.state.cart" class="card mb-3 shadow-sm border-0"
                                                :key="item.id">
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="d-flex flex-row align-items-center product-item">
                                                            <div class="product-title-card">
                                                                <p>{{ item.qty }} - {{ item.title }}</p>
                                                            </div>
                                                        </div>
                                                        <div class="align-items-center product-price-card">
                                                            <div>
                                                                <p class="mb-0"><i class="bi bi-currency-dollar"></i>{{
                                                                    item.price * item.qty }}</p>
                                                                <small v-if="item.hasDiscount"
                                                                    class="text-muted text-decoration-line-through"><i
                                                                        class="bi bi-currency-dollar"></i>{{
                                                                            item.price }}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr>
                                            <div class="d-flex justify-content-between mb-4">
                                                <p class="mb-2">Total</p>
                                                <p class="mb-2"><i class="bi bi-currency-dollar"></i>{{
                                                    $store.state.cartTotal }}</p>
                                            </div>

                                            <button type="button" class="btn btn-info btn-block btn-lg">
                                                Checkout
                                            </button>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import CartAddRemove from '../components/CartAddRemove.vue';
export default {
    components: { CartAddRemove },
    methods: {
        removeItem(item) {
            this.$store.commit('addRemoveCart', { product: item, toAdd: false })
        },
    },
}
</script>
<style scooped>
.product-item {
    width: 100%;
}

.product-title,
.product-price {
    font-size: 15px;
    color: black;
}

.product-price {
    font-weight: bold;
}

.product-title {
    display: block;
    width: 260px;
}

.product-title-card,
.product-price-card {
    font-size: 12px;
    color: black;
}

.product-price-card {
    width: 100%;
    display: block;
    text-align: right;
    margin-right: 0px;
}

.product-title-card {
    width: 100%;
    white-space: pre-wrap;
}
</style>