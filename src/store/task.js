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

      try {

        const { data, error } = await supabase

          .from("tasks")

          .select("*")

          .order("id", { ascending: false });

        if (error) {

          throw error;

        }

        this.tasks = data;

      } catch (err) {

        console.error("Error loading tasks:", err);

      }

    },

    // GET /tasks/{id}

    async getTaskById(id) {

      try {

        const { data, error } = await supabase

          .from("tasks")

          .select("*")

          .eq("id", id)

          .single();

        if (error) {

          throw error;

        }

        this.selectedTask = data;

        return data;

      } catch (err) {

        console.error("Error loading task:", err);

        return null;

      }

    },

    // POST /tasks

    async addTask(title) {

      try {

        const { error } = await supabase

          .from("tasks")

          .insert([

            {

              title,

              completed: false,

            },

          ]);

        if (error) {

          throw error;

        }

        await this.getAllTasks();

      } catch (err) {

        console.error("Error adding task:", err);

      }

    },

    // PUT /tasks/{id}

    async updateTask(id, title) {

      try {

        const { error } = await supabase

          .from("tasks")

          .update({ title })

          .eq("id", id);

        if (error) {

          throw error;

        }

        await this.getAllTasks();

      } catch (err) {

        console.error("Error updating task:", err);

      }

    },

    // PATCH /tasks/{id}/complete

    async markAsDone(id, completed) {

      try {

        const { error } = await supabase

          .from("tasks")

          .update({ completed })

          .eq("id", id);

        if (error) {

          throw error;

        }

        await this.getAllTasks();

      } catch (err) {

        console.error("Error updating task status:", err);

      }

    },

    // DELETE /tasks/{id}

    async deleteTask(id) {

      try {

        const { error } = await supabase

          .from("tasks")

          .delete()

          .eq("id", id);

        if (error) {

          throw error;

        }

        await this.getAllTasks();

      } catch (err) {

        console.error("Error deleting task:", err);

      }

    },

  },

});