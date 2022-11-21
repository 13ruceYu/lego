<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { pick } from 'lodash-es'

const props = defineProps({
  text: {
    type: String,
  },
  fontSize: {
    type: String,
  },
  tag: {
    type: String,
    default: 'div',
  },
})
const styleProps = computed(() => pick(props, ['fontSize']))
</script>

<template>
  <component :is="tag" :style="styleProps" class="l-text-component">
    {{ text }}
  </component>
</template>
