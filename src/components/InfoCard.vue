<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  }
})
</script>

<template>
  <article>
    <h2 class="text-2xl">{{ title }}</h2>
    <h3 class="text-[64px]">{{ subtitle }}</h3>
  </article>
</template>
