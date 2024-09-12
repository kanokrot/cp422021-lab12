<script setup>
import CourseInfoCard from "@/components/cards/CourseInfoCard.vue";
import AddDialog from "@/components/dialogs/AddDialog.vue";
import { onMounted } from "vue";
import { useCourseStore } from "@/store/course";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const router = useRouter();
const courseStore = useCourseStore();
const showAddCourseDialog = ref(false);
const courseInitData = ref({
  name : "",
  description : "",  
  permission : "public",
  image : "",
  lessons : [],
  paid : [],
});
const formats = [
  {md: 12, datatype: 'text', target: 'name', validation: ['required'], props: { label: 'ชื่อคอร์ส *', clearable: true } },  
  {md: 12, datatype: 'text', target: 'description', validation: ['required'], props: { label: 'รายละเอียด *', clearable: true } },
  {md: 12, datatype: 'text', target: 'image', validation: ['required'], props: { label: 'รูปภาพ *', clearable: true } },
  {md: 12, datatype: 'select', target: 'permission', validation: ['required'], props: { label: 'สิทธิ์การเข้าถึง *', items: ['public', 'user', 'paid'] } },
]
onMounted(() => {
  //courseStore.fetchCourses();
});

const addCourse = (data) => {
  courseStore.addCourse(data);
  showAddCourseDialog.value = false;
}
const enroll = (course) => {
  console.log(course);
  router.push(`/course/${course.id}`);
}
</script>
<template>
  <VCard :loading="courseStore.loading" :disabled="courseStore.loading">
    <VCardItem>
      <VCardTitle>คอร์สทั้งหมด</VCardTitle>
    </VCardItem>    
  </VCard>
  <VCard class="mt-8">
    <VCardText>
      <VRow>
        <VCol v-for="course in courseStore.courses" md="4" class="d-flex align-center justify-center">          
          <CourseInfoCard 
            :title="course.name" 
            :description="course.description" 
            :image="course.image" @enroll="enroll(course)" 
            :permission="course.permission"
          />
        </VCol>          
        <VCol v-if="authStore.user.token?.admin" cols="3" class="d-flex align-center justify-center">
          <VBtn color="primary" @click="showAddCourseDialog = true" block height="100">เพิ่มคอร์ส</VBtn>
        </VCol>
      </VRow>      
    </VCardText>
  </VCard>
  <AddDialog 
    v-model:isDialogVisible="showAddCourseDialog"     
    :data="courseInitData"
    title="เพิ่มคอร์ส" 
    :format="formats" 
    @submit="addCourse"
  />
</template>
