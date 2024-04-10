<script setup>
  import WelcomeCard from "../components/WelcomeCard.vue";
  import { onMounted } from "vue";
  import { useInventoryStore } from "../stores/inventoryStore.js";
  import { storeToRefs } from "pinia";

  const inventoryStore = useInventoryStore();
  const { getProducts, getCategoryProducts } = inventoryStore;
  const { categoryProducts } = storeToRefs(inventoryStore);

  onMounted(async () => {
    await getProducts();

    getCategoryProducts();
  });
</script>

<template>
  <main class="mt-4 w-full">
    <div class="flex gap-4">
      <WelcomeCard sectionName="stock de productos"/>
      <article class="*:text-darkBlue *:text-2xl w-2/5 bg-gradient-to-bl from-orange to-[#ebad3180] mr-4 rounded-xl p-6 h-52">
        <h2 class="font-black text-right">STOCK TOTAL</h2>
        <div class="flex flex-col text-xl font-bold h-36 justify-around">
          <template v-for="category in categoryProducts" :key="category">
            <span>{{ category }}</span>
          </template>
        </div>
      </article>
    </div>
  </main>
</template>