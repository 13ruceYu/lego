<template>
  <div
    class="edit-wrapper"
    @click="onItemClick(id)"
    :class="{ active: active }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['set-active'],
  setup(props, ctx) {
    const onItemClick = (id: string) => {
      ctx.emit('set-active', id)
    }

    return {
      onItemClick,
    }
  },
})
</script>

<style scoped lang="less">
.edit-wrapper {
  border: 1px solid transparent;
  &:hover {
    border: 1px dashed #aaa;
  }
  &.active {
    border: 1px solid pink;
  }
}
</style>
