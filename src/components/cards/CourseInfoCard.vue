<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required : true,
  },
  image: {
    type : String,    
  },
  permission : {
    type : String,
    required : true,
  }
})
</script>

<template>
  <v-card
    class="mx-auto"
    width="400"
  >
    <v-img
      class="align-end text-white"
      height="200"
      :src="image"
      cover
    >
      <v-card-title>{{ title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{ description }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange" @click="$emit('enroll')">Enroll</v-btn>
      <v-spacer></v-spacer>
      <div>{{ permission }}</div>
    </v-card-actions>
  </v-card>
</template>
