<template>
    <div v-if="product" class="container mt-5 d-flex justify-content-center">
        <div class="card col-lg-6 col-sm-12">
            <img :src="product.image" class="card-img-top" :alt="product.title">
            <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="card-text"><strong>{{ product.price }}$</strong></p>
                <p class="card-text"><small class="text-muted">Category: {{ product.category }}</small></p>
                <div class="btn-group">
                    <CartBTN :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import axios from 'axios';
import CartBTN from '../components/CartBTN.vue'

export default defineComponent({
    setup() {
        const store = useStore();
        const route = useRoute();
        const product = ref(null);

        onMounted(async () => {
            const productId = route.params.id;
            const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
            product.value = response.data;
        });

        const addToCart = (product: any) => {
            store.commit('addToCart', product);
        };

        return { product, addToCart };
    },
    components: { CartBTN },
});
</script>

<style scoped></style>