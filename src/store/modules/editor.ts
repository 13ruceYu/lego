import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from '../index'
import { TextComponentProps } from '@/defaultProps'

export interface ComponentData {
  props: { [key: string]: any }
  id: string
  name: string
}

export interface EditorProps {
  components: ComponentData[]
  currentElement: string
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '20px',
      color: 'red',
      lineHeight: '1',
      textAlign: 'left',
      fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '10px',
      fontWeight: 'bold',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: '',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello3',
      fontSize: '15px',
      actionType: 'url',
      url: 'https://www.baidu.com',
      lineHeight: '3',
      textAlign: 'left',
      fontFamily: '',
    },
  },
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps>) {
      const newComponent: ComponentData = {
        id: uuidv4(),
        name: 'l-text',
        props,
      }
      state.components.push(newComponent)
    },
    setActive(state, currentId: string) {
      state.currentElement = currentId
    },
    updateComponent(state, { key, value }) {
      const curComponent = state.components.find(
        (comp) => comp.id === state.currentElement
      )
      if (curComponent) {
        curComponent.props[key] = value
      }
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((comp) => comp.id === state.currentElement)
    },
  },
}

export default editor
