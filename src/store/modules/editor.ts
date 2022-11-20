import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from '../index'

interface ComponentData {
  props: { [key: string]: any }
  id: string
  name: string
}

export interface EditorProps {
  components: ComponentData[]
  currentElement: string
}

export const testComponents: ComponentData[] = [
  { id: uuidv4(), name: 'l-txt', props: { text: 'hello' } },
  { id: uuidv4(), name: 'l-txt', props: { text: 'hello1' } },
  { id: uuidv4(), name: 'l-txt', props: { text: 'hello2' } },
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: '',
  },
}

export default editor
