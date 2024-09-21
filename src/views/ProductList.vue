<template>
    <div class="container min-h-content py-5 text-center">
        <div class="row py-lg-5">
            <div class="row col filter-bloc">
                <div class="row col">
                    <select v-model="selectedCategory" @change="filterProducts" class="col-lg-6 col-sm-12">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>
                <div class="row col">
                    <label for="name" class="search-label">Search by Name:</label>
                    <input class="col-lg-12 col-sm-12" type="text" v-model="searchQuery" @input="filterProducts"
                        placeholder="Enter product name" />

                </div>

            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div class="col" v-for="product in filteredProducts" :key="product.id">
                    <div class="card shadow-sm">

                        <p class="card-text">
                            {{ product.title }}<br>
                            <small class="text-muted">Category: {{ product.category }}</small>
                        </p>
                        <router-link :to="`/product/${product.id}`">
                            <img class="bd-placeholder-img card-img-top" width="100%" :src="product.image"
                                :alt="product.title">
                        </router-link>
                        <div class="card-body">
                            <router-link :to="`/product/${product.id}`">More Details</router-link>
                            <div class="d-flex justify-content-between align-items-center btn-actions">
                                <div class="btn-group">
                                    <CartBTN :product="product" />
                                </div>
                                <H3 class="text-muted"><i class="bi bi-currency-dollar"></i>{{ product.price }}</H3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CartBTN from '../components/CartBTN.vue'
import axios from 'axios'

export default {
    setup() {

    },
    components: { CartBTN },
    data() {
        return {
            products: [],
            categories: [],
            selectedCategory: '',
            searchQuery: '',
            filteredProducts: []

        }
    },
    beforeMount: function mounted() {
        this.fetchProducts()
    },
    mounted() {
        this.filterProducts();
    },

    methods: {
        // fetch all product
        async fetchProducts() {
            const response = await axios.get('https://fakestoreapi.com/products');
            if (response)
                this.products = response.data;
            this.filteredProducts = this.products;
            this.categories = Array.from(new Set(this.products.map(product => product.category)));
        },

        //filter production function by category and search query
        filterProducts() {
            this.filteredProducts = this.products.filter((product) => {
                const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
                const matchesName = this.searchQuery ? product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
                return matchesCategory && matchesName;
            });
        },

    }
}
</script>
<style scoped>
.filter-bloc {
    margin: 10px;
}

.search-label {
    display: flex;
}

.card-text {
    height: 65px;
    padding: 5px;
}

.shadow-sm {
    width: 100%;
    height: 400px;
    display: block;
    padding: 15px;
    margin: 8px;
}

.card-img-top {
    width: 50%;
    height: 50%;
}

.btn-actions {
    margin-top: 20px;
}
</style>