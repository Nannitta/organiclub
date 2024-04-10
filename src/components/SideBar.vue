<script setup>
  import IconComponent from "./icons/IconComponent.vue"
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
        <IconComponent name="menu" :height=24 :width=24 />
      </div>
      <nav>
        <ul class="*:font-roboto-medium *:font-semibold *:text-darkBlue *:flex *:items-center *:gap-3 *:p-4 *:cursor-pointer">
          <li title="Inventario" class="hover:bg-lightBlue">
            <IconComponent name="inventory" :height=24 :width=24 />
            Inventario
          </li>
          <li title="Gestión de ventas" class="hover:bg-lightBlue">
            <IconComponent name="sell" :height=24 :width=24 />
            Gestión de ventas
          </li>
          <li title="Recibos" class="hover:bg-lightBlue">
            <IconComponent name="receipt" :height=24 :width=24 />
            Recibos
          </li>
          <li title="Pedidos" class="hover:bg-lightBlue">
            <IconComponent name="cart" :height=24 :width=24 />
            Pedidos
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <ul>
        <li title="Perfil" class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue" @mouseover="hoveredAvatar=true" @mouseleave="hoveredAvatar=false">
          <button>
            <IconComponent name="avatar" :height=24 :width=24 :hovered="hoveredAvatar"/>
            Perfil
          </button>
        </li>
        <li title="Configuración" class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue" @mouseover="hoveredSettings=true" @mouseleave="hoveredSettings=false">
          <button>
            <IconComponent name="settings" :height=24 :width=24 :hovered="hoveredSettings"/>
            Configuración
          </button>
        </li>
        <li title="Cerrar sesión" class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue" @mouseover="hoveredPower=true" @mouseleave="hoveredPower=false">
          <button>
            <IconComponent name="powerSettings" :height=24 :width=24 :hovered="hoveredPower"/>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>