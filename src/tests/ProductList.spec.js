import { mount } from '@vue/test-utils'
import ProductsList from '@/views/ProductsList.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')

describe('ProductsList.vue', () => {
  let wrapper

  beforeEach(async () => {
    // Mock the API response
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Product 1', category: 'Category 1', image: '', price: 10 },
        { id: 2, title: 'Product 2', category: 'Category 2', image: '', price: 20 },
      ],
    })

    // Mount the component
    wrapper = mount(ProductsList)
    await flushPromises() // Wait for all promises to resolve
  })

  it('renders the component and fetches products', () => {
    // Check if the products are fetched and rendered
    expect(wrapper.findAll('.card').length).toBe(2)
  })

  it('filters products by category', async () => {
    // Set the category and trigger filtering
    await wrapper.setData({ selectedCategory: 'Category 1' })
    wrapper.vm.filterProducts()
    await wrapper.vm.$nextTick()

    // Check if the filtered products are displayed correctly
    expect(wrapper.findAll('.card').length).toBe(1)
    expect(wrapper.text()).toContain('Product 1')
    expect(wrapper.text()).not.toContain('Product 2')
  })

  it('filters products by search query', async () => {
    // Set the search query and trigger filtering
    await wrapper.setData({ searchQuery: 'Product 2' })
    wrapper.vm.filterProducts()
    await wrapper.vm.$nextTick()

    // Check if the filtered products are displayed correctly
    expect(wrapper.findAll('.card').length).toBe(1)
    expect(wrapper.text()).toContain('Product 2')
    expect(wrapper.text()).not.toContain('Product 1')
  })

  it('displays "No product exist!" message when no products are available', async () => {
    // Set the products to an empty array
    await wrapper.setData({ filteredProducts: [] })
    await wrapper.vm.$nextTick()

    // Check if the "No product exist!" message is displayed
    expect(wrapper.text()).toContain('No product exist!')
  })
})
