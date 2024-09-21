import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ProductDetails from '@/views/ProductDetails.vue'
import CartBTN from '@/components/CartBTN.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [{ path: '/product/:id', name: 'ProductDetails' }]
})

describe('ProductDetails.vue', () => {
  let wrapper, store, actions, state
  const mock = new MockAdapter(axios)

  beforeEach(() => {
    state = {
      cart: []
    }
    actions = {
      addToCart: jest.fn()
    }
    store = new Vuex.Store({
      state,
      actions,
      mutations: {
        addToCart: (state, product) => {
          state.cart.push(product)
        }
      }
    })

    mock.onGet('https://fakestoreapi.com/products/1').reply(200, {
      id: 1,
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
      category: 'Category 1',
      image: 'image1.jpg'
    })

    wrapper = mount(ProductDetails, {
      localVue,
      store,
      router,
      mocks: {
        $route: {
          params: { id: '1' }
        }
      }
    })
  })

  it('fetches and displays the product details', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.card-title').text()).toBe('Product 1')
    expect(wrapper.find('.card-text').text()).toContain('Description of Product 1')
    expect(wrapper.find('.card-text').text()).toContain('100$')
    expect(wrapper.find('.card-text').text()).toContain('Category: Category 1')
  })

  it('calls addToCart when CartBTN is clicked', async () => {
    await wrapper.vm.$nextTick()
    const cartBtn = wrapper.findComponent(CartBTN)
    await cartBtn.vm.$emit('add-to-cart')
    expect(actions.addToCart).toHaveBeenCalledWith(expect.any(Object), {
      id: 1,
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
      category: 'Category 1',
      image: 'image1.jpg'
    })
  })
})
