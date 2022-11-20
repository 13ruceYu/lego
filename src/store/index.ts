import { createStore } from 'vuex'
import templates, { TemplatesProps } from './modules/templates'
import user, { UserProps } from './modules/user'
import editor, { EditorProps } from './modules/editor'

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
  editor: EditorProps
}

const store = createStore({
  modules: {
    user,
    templates,
    editor,
  },
})

export default store
