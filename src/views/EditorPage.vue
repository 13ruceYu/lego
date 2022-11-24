<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider
        width="300"
        style="border: 1px solid pink; background-color: aliceblue"
      >
        <ComponentsList
          :list="defaultTextTemplates"
          @on-item-click="addItem"
        ></ComponentsList>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <component
              v-for="comp in components"
              :is="comp.name"
              :key="comp.id"
              v-bind="comp.props"
            >
            </component>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: purple"
        class="settings-panel"
      >
        组件属性
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import LText from '@/components/LText.vue'
import ComponentsList from '@/components/ComponentsList.vue'
import { defaultTextTemplates } from '@/defaultTemplates'

export default defineComponent({
  components: {
    LText,
    ComponentsList,
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    const addItem = (props: any) => {
      store.commit('addComponent', props)
    }

    return {
      components,
      defaultTextTemplates,
      addItem,
    }
  },
})
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
