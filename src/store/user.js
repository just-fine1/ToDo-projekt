

import { defineStore } from 'pinia';
import { supabase } from "../lib/supabase";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {

    // Aktuellen USER abrufen

    async fetchUser() {

      const {

        data: { user },

        error,

      } = await supabase.auth.getUser();

      if (error) {

        throw error;

      }

      this.user = user;

    },

    // Registrierung

    async signUp(email, password) {

      const { data, error } = await supabase.auth.signUp({

        email,

        password,

      });

      if (error) {

        throw error;

      }

    

      this.user = data.user;

    },

    // Login

    async signIn(email, password) {

      const { data, error } =

        await supabase.auth.signInWithPassword({

          email,

          password,

        });

      if (error) {

        throw error;

      }

      this.user = data.user;

    },

  },

 

  persist: true,

});