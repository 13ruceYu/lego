import UploaderFileVue from '@/components/UploaderFile.vue'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
let wrapper: VueWrapper<any>
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('uploader file component', () => {
  beforeAll(() => {
    wrapper = shallowMount(UploaderFileVue, {
      props: {
        action: 'test.url',
      },
    })
  })

  it('basic layout before uploading', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.get('button span').text()).toBe('点击上传')
    expect(wrapper.get('input').isVisible()).toBeFalsy()
  })

  it('upload process should works fine', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 'success' })
    const fileInput = wrapper.get('input').element as HTMLInputElement
    const files = [testFile]
    Object.defineProperty(fileInput, 'files', {
      value: files,
      writable: false,
    })
    await wrapper.get('input').trigger('change')
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button span').text()).toBe('正在上传')
    await flushPromises()
    expect(wrapper.get('button span').text()).toBe('上传成功')
  })

  it('should return error text when post is rejected', async () => {
    mockedAxios.post.mockRejectedValueOnce({ status: 'error' })
    await wrapper.get('input').trigger('change')
    expect(mockedAxios.post).toHaveBeenCalledTimes(2)
    expect(wrapper.get('button span').text()).toBe('正在上传')
    await flushPromises()
    expect(wrapper.get('button span').text()).toBe('上传失败')
  })
})
