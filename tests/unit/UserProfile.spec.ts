import UserProfileVue from '@/components/UserProfile.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { message } from 'ant-design-vue'
import store from '@/store/index'

jest.mock('ant-design-vue', () => ({
  message: {
    success: jest.fn(),
  },
}))
// jest.mock('vuex')
const mockedRoutes: string[] = []
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: (url: string) => mockedRoutes.push(url),
  }),
}))

let wrapper: VueWrapper<any>
const mockComponent = {
  template: '<div><slot></slot></div>',
}
const mockComponent2 = {
  template: '<div><slot></slot><slot name="overlay"></slot></div>',
}
const globalComponents = {
  'a-button': mockComponent,
  'a-dropdown-button': mockComponent2,
  'a-menu': mockComponent,
  'a-menu-item': mockComponent,
  'router-link': mockComponent,
}

describe('UserProfile component', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    wrapper = mount(UserProfileVue, {
      props: {
        user: { isLogin: false },
      },
      global: {
        components: globalComponents,
        provide: {
          store,
        },
      },
    })
  })
  it('should render login button when login false', async () => {
    expect(wrapper.get('div').text()).toBe('登录')
    await wrapper.get('div').trigger('click')
    expect(message.success).toHaveBeenCalled()
    expect(store.state.user.userName).toBe('bruce')
  })
  it('should render username when login is true', async () => {
    await wrapper.setProps({
      user: { isLogin: true, userName: 'bruce' },
    })
    expect(wrapper.get('.user-profile-component').html()).toContain('bruce')
    expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
  })
  it('should call logout and show message, call router.push after timeout', async () => {
    await wrapper.get('.user-profile-dropdown div').trigger('click')
    expect(store.state.user.isLogin).toBeFalsy()
    expect(message.success).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(mockedRoutes).toEqual(['/'])
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(message as jest.Mocked<typeof message>).success.mockReset()
  })
})
