<template>
  <div class="bg-green-400 h-full">
    <div class="flex flex-col items-center justify-center text-white text-2xl">
      <img 
        class="rounded-full h-48 w-48 m-4"
        src="https://i.pinimg.com/474x/a1/9d/fd/a19dfd0cd5b84390c983b372c91b7f22.jpg"
      >

      <h1>{{ profile }}</h1>

      <ul class="w-full px-6">
        <li 
          v-for="link of links" 
          :key="link.href"
          class="my-4"
        >
          <a 
            :href="link.href"
            target="_blank"
            class="
              border-white border-2 border w-100 
              flex p-2
              hover:bg-white hover:text-green-500 ease-linear duration-200
            "
          >
            {{ link.text }}
          </a>
        </li>
      </ul>

    </div>
  </div>
</template>

<script lang="ts" setup>
const profile = '@lmiller1990'

const links = [
  {
    href: 'https://lachlan-miller.me',
    text: 'My website',
  },
  {
    href: 'https://github.com/lmiller1990',
    text: 'GitHub',
  },
  {
    href: 'https://twitter.com/Lachlan19900',
    text: 'Twitter',
  }
] as const
</script>

<style>
html, body, #app {
  height: 100%;
}
</style>