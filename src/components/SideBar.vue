<script setup>
  import IconAvatar from "./icons/IconAvatar.vue";
  import IconSettings from "./icons/IconSettings.vue";
  import IconPower from "./icons/IconPower.vue";
  import { ref } from "vue";

  const hoveredAvatar = ref(false);
  const hoveredSettings = ref(false);
  const hoveredPower = ref(false);
</script>

<template>
  <header class="lg:w-[264px] lg:h-screen flex flex-col justify-between bg-white shadow-md shadow-right">
    <div>
      <div class="flex justify-between p-4">
        <img src="../assets/organiclub.webp" alt="Logo corporativo" class="w-32">
        <img src="../assets/icons/menu.svg" alt="Menú">
      </div>
      <nav>
        <ul class="*:font-roboto-medium *:font-semibold *:text-darkBlue *:flex *:items-center *:gap-3 *:p-4">
          <li title="Inventario" class="hover:bg-lightBlue">
            <img src="../assets/icons/inventory.svg" alt="Icono de inventario">
            Inventario
          </li>
          <li title="Gestión de ventas" class="hover:bg-lightBlue">
            <img src="../assets/icons/sell.svg" alt="Icono de gestión de ventas">
            Gestión de ventas
          </li>
          <li title="Recibos" class="hover:bg-lightBlue">
            <img src="../assets/icons/receipt.svg" alt="Icono de recibos">
            Recibos
          </li>
          <li title="Pedidos" class="hover:bg-lightBlue">
            <img src="../assets/icons/cart.svg" alt="Icono de pedidos">
            Pedidos
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <ul>
        <li title="Perfil" class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue" @mouseover="hoveredAvatar=true" @mouseleave="hoveredAvatar=false">
          <button>
            <IconAvatar fill="#293b66bf" :hovered="hoveredAvatar"/>
            Perfil
          </button>
        </li>
        <li title="Configuración" class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue" @mouseover="hoveredSettings=true" @mouseleave="hoveredSettings=false">
          <button>
            <IconSettings fill="#293b66bf" :hovered="hoveredSettings"/>
            Configuración
          </button>
        </li>
        <li title="Cerrar sesión" class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue" @mouseover="hoveredPower=true" @mouseleave="hoveredPower=false">
          <button>
            <IconPower fill="#293b66bf" :hovered="hoveredPower"/>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>