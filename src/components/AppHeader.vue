<template>
  <header>
    <div class="navbar navbar-dark bg-dark shadow-sm col-12">
      <div class="container">
        <router-link :to="{ name: 'ProductList' }" class="navbar-brand d-flex align-items-center">
          <i class="bi bi-box2-heart h1 me-1"></i>
          <strong>Fake Store</strong>
        </router-link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item me-3">
            <router-link class="nav-link" :class="$route.name == 'ShoopingCart' ? 'active' : ''" aria-current="page"
              :to="{ name: 'ShoopingCart' }">
              <i class="bi bi-cart3 h4"></i>
              <span v-if="$store.state.cart.length > 0"
                class="align-items-center justify-content-center translate-middle badge rounded-pill bg-secondary">
                {{ $store.state.cart.length }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>

</template>