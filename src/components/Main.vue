<script lang="ts" setup>
import { useAuth } from "../composables/auth";

const { user, login, logout, info } = useAuth();
</script>

<template>
  <div>Error {{ info.error }}</div>

  <div>loading {{ info.loading }}</div>

  <div>user {{ user }}</div>

  <button @click="login()">Login</button>
  <button @click="logout()">Logout</button>
</template>
