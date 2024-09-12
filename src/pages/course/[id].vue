<script setup>
import InfoCard from "@/components/cards/InfoCard.vue";
import { useRouter, useRoute } from "vue-router";
import { useCourseStore } from "@/store/course";

import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const courseStore = useCourseStore();
const router = useRouter();
const route = useRoute();

const addLessonDialog = ref(false);
const lessonInitData = ref({
  name : "",
  description : "",  
  content : "",
  permission : "public",
});
const formats = [
  {md: 12, datatype: 'text', target: 'name', validation: ['required'], props: { label: 'ชื่อบทเรียน *', clearable: true } },
  {md: 12, datatype: 'text', target: 'description', validation: ['required'], props: { label: 'รายละเอียด *', clearable: true } },
  {md: 12, datatype: 'text', target: 'content', validation: ['required'], props: { label: 'เนื้อหา *', clearable: true } },
  {md: 12, datatype: 'select', target: 'permission', validation: ['required'], props: { label: 'สิทธิ์การเข้าถึง *', items: ['public', 'user', 'paid'] } },  
]

const courseInfo = computed(() => {
  return courseStore.courses.find(c => c.id == route.params.id);
});

const addLesson = (data) => {
  data.course = route.params.id;
  courseStore.addLesson(data);
  addLessonDialog.value = false;
}
const getContent = async (lesson) => {
  let lessonContent = await courseStore.getLesson(lesson.id);  
  lesson.content = lessonContent.content || lessonContent.reason;
}
</script>
<template>
  <VCard :loading="courseStore.loading" :disabled="courseStore.loading">
    <VCardItem v-if="courseInfo">
      <VCardTitle class="inline">
        <VBtn icon="mdi-arrow-left" @click="router.go(-1)" variant="text"></VBtn>
        คอร์ส : {{ courseInfo.name }}
      </VCardTitle>
      <VCardSubtitle class="ms-5">{{ courseInfo.description }}</VCardSubtitle>
      <VCardItem>
        <VImg :src="courseInfo.image" height="200" cover></VImg>
      </VCardItem>
    </VCardItem>    
  </VCard>
  <VCard class="mt-5" v-if="courseInfo">
    <VList lines="two">
      <VListItem>
        <VListItemTitle>เนื้อหา</VListItemTitle> 
        <template v-slot:append>
          <VBtn color="primary" @click="addLessonDialog = true" v-if="authStore.user.token?.admin">เพิ่มบทเรียน</VBtn>
        </template>
      </VListItem>
      <VDivider></VDivider>
      <VListItem v-for="(item,index) in courseInfo.lessons">
        <VListItemTitle>{{item.name}}</VListItemTitle>
        <VListItemSubtitle>{{item.description}}</VListItemSubtitle>
        <template v-slot:prepend>
          <VAvatar color="primary"><span class="text-h5 text-white">{{ index+1 }}</span></VAvatar>
        </template>
        <template v-slot:append>
          <span class="text-h6 me-2">สิทธิ์การอ่าน {{ item.permission }}</span>     
          <VBtn icon color="primary" @click="getContent(item)">
            <VIcon>mdi-eye</VIcon>
          </VBtn>
        </template>
        <div v-if="item.content" v-html="item.content"></div>
      </VListItem>      
    </VList>    
  </VCard>
  <AddDialog
    v-model:isDialogVisible="addLessonDialog"
    :data="lessonInitData"
    title="เพิ่มบทเรียน"
    :format="formats" 
    @submit="addLesson"
  />
</template>
