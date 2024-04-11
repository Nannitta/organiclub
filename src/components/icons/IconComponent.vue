<script setup>
import { defineAsyncComponent, watch } from 'vue'
const props = defineProps({
  fill: {
    type: String,
    default: '#293b66bf'
  },
  fillHover: {
    type: String,
    default: '#293B66'
  },
  width: {
    type: Number,
    default: 24
  },
  height: {
    type: Number,
    default: 24
  },
  hovered: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  }
})

let Icon = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`))

watch(
  () => props.name,
  () => (Icon = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`)))
)
</script>

<template>
  <Icon :heigth="height" :width="width" :fill="hovered ? fillHover : fill" />
</template>
