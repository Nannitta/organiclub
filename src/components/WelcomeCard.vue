<script setup>
  defineProps({
    sectionName: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <article class="ml-4 h-52 w-3/5 bg-gradient-to-tl from-[#12539fb8] to-darkBlue p-6 rounded-xl">
    <div class="*:text-white *:font-roboto-black *:text-2xl flex flex-col justify-between h-full">
      <h1 class="font-black">¡Hola, <br>CLUB KAIZEN KARATE!</h1>
      <span class="font-medium">Aquí está tu {{ sectionName }}</span>
    </div>
  </article>
</template>