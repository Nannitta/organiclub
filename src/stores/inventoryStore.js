import { defineStore } from 'pinia';
import { ref } from "vue";
import { getProductsService } from "../services/index.js";

export const useInventoryStore = defineStore('InventoryStore', () => {
  const products = ref([]);
  const categoryProducts = ref([]);

  const getProducts = async () => {
    products.value = await getProductsService();
  }

  const getCategoryProducts = () => {
    const category = [];
    
    products.value.forEach(product => {
      category.push(product.category);
    });

    categoryProducts.value = new Set(category);
  }

  return { products, getProducts, categoryProducts, getCategoryProducts };
})