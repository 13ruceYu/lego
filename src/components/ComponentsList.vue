<script lang="ts">
import { defineComponent } from 'vue'
import LText from './LText.vue'

export default defineComponent({
  name: 'ComponentsList',
  components: {
    LText,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ['on-item-click'],
  setup(props, ctx) {
    const onItemClick = (data: any) => {
      ctx.emit('on-item-click', data)
    }
    return {
      onItemClick,
    }
  },
})
</script>

<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <LText v-bind="item"></LText>
    </div>
  </div>
</template>
