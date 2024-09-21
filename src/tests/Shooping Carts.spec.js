import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ShoppingCart from '@/views/ShoppingCart.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ShoppingCart.vue', () => {
  let wrapper, store, actions, state

  beforeEach(() => {
    state = {
      cart: [
        { id: 1, title: 'Product 1', image: 'image1.jpg', price: 10, qty: 2, hasDiscount: false },
        { id: 2, title: 'Product 2', image: 'image2.jpg', price: 20, qty: 1, hasDiscount: true }
      ],
      cartTotal: 40
    }
    actions = {
      addRemoveCart: jest.fn()
    }
    store = new Vuex.Store({
      state,
      actions,
      getters: {
        cart: state => state.cart,
        cartTotal: state => state.cartTotal
      }
    })

    wrapper = mount(ShoppingCart, { store, localVue })
  })

  it('renders the component and displays cart items', () => {
    expect(wrapper.findAll('.card').length).toBe(2)
    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).toContain('Product 2')
    expect(wrapper.text()).toContain('$40')
  })

  it('removes an item from the cart', async () => {
    const removeButton = wrapper.find('.bi-trash3')
    await removeButton.trigger('click')

    expect(actions.addRemoveCart).toHaveBeenCalledWith(expect.any(Object), { product: state.cart[0], toAdd: false })
  })

  it('displays the correct total', () => {
    expect(wrapper.text()).toContain('$40')
  })

  it('handles empty cart correctly', async () => {
    store = new Vuex.Store({
      state: {
        cart: [],
        cartTotal: 0
      },
      actions,
      getters: {
        cart: state => state.cart,
        cartTotal: state => state.cartTotal
      }
    })
    wrapper = mount(ShoppingCart, { store, localVue })
    expect(wrapper.text()).toContain('You have 0 items in your cart')
    expect(wrapper.text()).toContain('$0')
  })
})
