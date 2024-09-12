<script setup>
import { onMounted } from 'vue';
import { useCourseStore } from './store/course';
const courseStore = useCourseStore();
onMounted(() => {
  courseStore.fetchCourses();
});
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
