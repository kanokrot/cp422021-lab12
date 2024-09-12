import { auth, functions } from "@/firebase"
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword} from "firebase/auth"
import { httpsCallable } from "firebase/functions"
import { call, db } from '@/firebase'
import { addDoc, arrayUnion, collection, doc, getDoc, limit, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

import { defineStore } from "pinia"


export const useCourseStore = defineStore({
  id: "course",
  state: () => {
    return {      
      courses: [],
      unsubscribe: null,      
      loading: true,
    }
  },

  actions: {
    fetchCourses() {
      this.loading = true
      if(this.unsubscribe) {
        this.unsubscribe()
      }
      const q = query(collection(db, "courses"), limit(100))
      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        const courses = []
        querySnapshot.forEach((doc) => {
          courses.push({...doc.data(), id: doc.id})
        })
        this.courses = courses
        this.loading = false
      })
    },
    async addCourse(course) {      
      this.loading = true
      const courseRef = collection(db, "courses")
      await addDoc(courseRef, course)
      this.loading = false
    },
    async getLesson(id) {
      try {
        this.loading = true
        const lessonRef = doc(db, "lessons", id)
        const lessonDoc = await getDoc(lessonRef)
        let lesson = lessonDoc.data()
        this.loading = false
        return lesson
      }catch(err) {
        console.error(err)
        this.loading = false
        return { success: false, reason: err }
      }
    },
    async addLesson(lesson) {      
      try {
        this.loading = true
        // add lesson to lesson database
        let lessonRef = collection(db, "lessons")
        let res = await addDoc(lessonRef, lesson)
        
        // add lesson to course database      
        const courseRef = doc(db, "courses", lesson.course)
        let lessonSnippest = { name : lesson.name, description : lesson.description , id : res.id, permission : lesson.permission }
        await updateDoc(courseRef, {
          lessons: arrayUnion(lessonSnippest)
        })
      } catch (err) {
        this.loading = false
        console.error(err)
        return { success: false, reason: err }
      }
    },
  }
})
    