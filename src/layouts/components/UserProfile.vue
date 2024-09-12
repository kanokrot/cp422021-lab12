<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  await authStore.signout()
  router.push('/login')
}
const login = () => {
  router.push('/login')
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem v-if="authStore.user.uid">
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ authStore.user?.displayName }}
            </VListItemTitle>            
          </VListItem>
          <VDivider class="my-2" />

          <!-- login if not logged in -->
          <VListItem v-if="!authStore.user.uid" @click="login">
            <VListItemTitle>Login</VListItemTitle>
          </VListItem>          
          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem v-if = "authStore.user.uid" @click="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="ri-logout-box-r-line"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
