import { defineStore } from "pinia";

import { supabase } from "../lib/supabase";

export const useTaskStore = defineStore("tasks", {

  state: () => ({

    tasks: [],

    selectedTask: null,

  }),

  actions: {

    // GET /tasks

    async getAllTasks() {

      const { data, error } = await supabase

        .from("tasks")

        .select("*")

        .order("id", { ascending: false });

      if (error) {

        console.error(error);

        return;

      }

      this.tasks = data;

    },

    // GET /tasks/{id}

    async getTaskById(id) {

      const { data, error } = await supabase

        .from("tasks")

        .select("*")

        .eq("id", id)

        .single();

      if (error) {

        console.error(error);

        return;

      }

      this.selectedTask = data;

      return data;

    },

    // POST /tasks

    async addTask(title) {

      const { error } = await supabase

        .from("tasks")

        .insert([

          {

            title,

            completed: false,

          },

        ]);

      if (error) {

        console.error(error);

        return;

      }

      await this.getAllTasks();

    },

    // PUT /tasks/{id}

    async updateTask(id, title) {

      const { error } = await supabase

        .from("tasks")

        .update({ title })

        .eq("id", id);

      if (error) {

        console.error(error);

        return;

      }

      await this.getAllTasks();

    },

    // PATCH /tasks/{id}/complete

    async markAsDone(id, completed) {

      const { error } = await supabase

        .from("tasks")

        .update({ completed })

        .eq("id", id);

      if (error) {

        console.error(error);

        return;

      }

      await this.getAllTasks();

    },

    // DELETE /tasks/{id}

    async deleteTask(id) {

      const { error } = await supabase

        .from("tasks")

        .delete()

        .eq("id", id);

      if (error) {

        console.error(error);

        return;

      }

      await this.getAllTasks();

    },

  },

});