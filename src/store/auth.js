import { auth, functions } from "@/firebase"
import { getAdditionalUserInfo, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword} from "firebase/auth"
import { httpsCallable } from "firebase/functions"
import { call, db } from '@/firebase'
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'

import { defineStore } from "pinia"


export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {      
      user: {},
    }
  },

  actions: {
    async signin(email, password) {
      try {
        this.loading = true
        let res = await signInWithEmailAndPassword(auth, email, password)
        if (res) {          
          this.user = res.user;
          return { success: true }
        }
      } catch (err) {
        let reason = {}
        if (err.code == "auth/user-not-found") {
          reason = { email: "ไม่พบผู้ใช้งานนี้ในระบบ" }
        } else if (err.code == "auth/wrong-password") {
          reason = { password : "รหัสผ่านไม่ถูกต้อง" }
        }
        console.error(err)
        return { success: false, reason: reason }
      } finally {
        this.loading = false
      }
    },
    async signup(email, password) {
      try {
        this.loading = true
        let res = await createUserWithEmailAndPassword(auth, email, password)
        if (res) {
          return { success: true }
        }
      } catch (err) {
        console.error(err)
        return { success: false, reason: err }
      } finally {
        this.loading = false
      }
    },

    async signinGoogle() {
      try {
        this.loading = true
        let provider = new GoogleAuthProvider()
        let res = await signInWithPopup(auth, provider)
        if (res) {          
          return { success: true }
        }
      } catch (err) {
        console.log(err)
        return { success: false, reason: err }
      } finally {
        this.loading = false
      }
    },

    async signout() {
      this.loading = true
      await signOut(auth)
      this.user = {}
      this.loading = false
      document.location.reload()
    },
  }
})
    