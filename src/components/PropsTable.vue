<template>
  <div class="props-table">
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="prop-item__label">{{ value?.text }}</span>
      <div class="prop-item__component">
        <component
          :is="value?.component"
          :[value.valueProp]="value?.value"
          v-bind="value?.extraProps"
          v-on="value.events"
        >
          <template v-if="value?.options">
            <component
              :is="value.subComponent"
              v-for="(option, i) in value.options"
              :key="i"
              :value="option.value"
            >
              {{ option.text }}
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TextComponentProps } from '@/defaultProps'
import { mapPropsToForms, PropsToForm } from '@/propsMap'
import { reduce } from 'lodash'
import { defineComponent, PropType, computed } from 'vue'

interface FormProps {
  component: string
  subComponent?: string
  value: string
  extraProps?: { [key: string]: any }
  text?: string
  options?: { text: string; value: any }[]
  valueProp: string
  eventName: string
  events: { [key: string]: (e: any) => void }
}

export default defineComponent({
  name: 'PropsTable',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true,
    },
  },
  emits: ['change'],
  setup(props, ctx) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if (item) {
            const {
              valueProp = 'value',
              eventName = 'change',
              initialTransform,
              afterTransform,
            } = item
            const newItem: FormProps = {
              ...item,
              value: initialTransform ? initialTransform(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: any) => {
                  ctx.emit('change', {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  })
                },
              },
            }
            result[newKey] = newItem
          }
          return result
        },
        {} as { [key: string]: FormProps }
      )
    })
    return {
      finalProps,
    }
  },
})
</script>

<style scoped lang="less">
.props-table {
  .prop-item {
    display: flex;
    align-items: center;
    &__label {
      width: 4rem;
    }
    &__component {
      width: 100%;
    }
  }
}
</style>
