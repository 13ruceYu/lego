import { shallowMount, VueWrapper } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
const msg = 'new message'
let wrapper: VueWrapper<any>

describe('HelloWorld.vue', () => {
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
  })

  it('renders props.msg when passed', () => {
    expect(wrapper.text()).toMatch(msg)
    expect(wrapper.findComponent({ name: 'Hello' }).exists()).toBeTruthy()
  })

  it('should update the count when clicking the button', async () => {
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('2')
  })

  it('should add todo when fill the input and click the button', async () => {
    const todoContent = 'buy milk'

    await wrapper.get('input').setValue(todoContent)
    expect(wrapper.get('input').element.value).toBe(todoContent)
    await wrapper.get('.addTodo').trigger('click')
    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.get('li').text()).toBe(todoContent)
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('send')
    const events = wrapper.emitted('send')!
    expect(events[0]).toEqual([todoContent])
  })

  it('should load user message when click the load button', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { username: 'bobo' } })
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled()
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    await flushPromises()
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.get('.userName').text()).toBe('bobo')
  })

  it('should load error when return promise reject', async () => {
    mockAxios.get.mockRejectedValueOnce('error')
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled()
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    await flushPromises()
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.find('.error').exists()).toBeTruthy()
  })

  afterEach(() => {
    mockAxios.get.mockReset()
  })
})
