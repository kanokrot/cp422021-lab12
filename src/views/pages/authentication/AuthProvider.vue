<script setup>
import { useTheme } from 'vuetify'

const { global } = useTheme()

const authProviders = [
  {
    icon: 'bxl-facebook',
    color: '#4267b2',
    colorInDark: '#4267b2',
    provider: 'facebook',
  },
  {
    icon: 'bxl-twitter',
    color: '#1da1f2',
    colorInDark: '#1da1f2',
    provider: 'twitter',
  },
  {
    icon: 'bxl-github',
    color: '#272727',
    colorInDark: '#fff',
    provider: 'github',
  },
  {
    icon: 'bxl-google',
    color: '#db4437',
    colorInDark: '#db4437',
    provider: 'google',
  },
]
const emit = defineEmits(['provider'])
</script>

<template>
  <VBtn
    v-for="link in authProviders"
    :key="link.icon"
    :icon="link.icon"
    variant="text"
    :color="global.name.value === 'dark' ? link.colorInDark : link.color"
    @click="$emit('provider', link.provider)"
  />
</template>
