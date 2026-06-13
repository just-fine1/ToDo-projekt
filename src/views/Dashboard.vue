<template>

  <v-container class="py-6">

    <!-- TITLE -->

<v-card class="pa-4 mb-4">

  <v-row align="center" justify="space-between" no-gutters>

    

    <v-col cols="auto">

      <h1>TODO LIST</h1>

    </v-col>

    <v-col cols="auto">

      <v-btn

        color="red-darken-2"

        variant="flat"

        class="text-white"

        @click="logout"

      >

        <v-icon start>mdi-logout</v-icon>

        Logout

      </v-btn>

    </v-col>

  </v-row>

</v-card>

    <!-- INPUT + FILTER + BUTTON -->

    <v-row class="mb-4">

      <!-- INPUT -->

      <v-col cols="12" md="4">

        <v-text-field

          v-model="newTask"

          label="Neue Aufgabe"

          variant="outlined"

        />

      </v-col>

      <!-- FILTER -->

      <v-col cols="12" md="4">

        <v-select

          v-model="filter"

          :items="['all','open','done']"

          label="Filter"

          variant="outlined"

        />

      </v-col>

      <!-- BUTTON -->

      <v-col cols="12" md="4">

        <v-btn color="primary" block @click="handleAddTask">

          Add Task

        </v-btn>

      </v-col>

    </v-row>

    <!-- LIST WRAPPER -->

    <v-card class="pa-2">

      <v-list>

        <v-list-item

          v-for="task in filteredTasks"

          :key="task.id"

        >

          <!-- CHECKBOX -->

          <template #prepend>

            <v-checkbox

              :model-value="task.completed"

              @change="toggleTask(task)"

            />

          </template>

          <!-- TEXT -->

          <v-list-item-title>

            <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">

              {{ task.title }}

            </span>

          </v-list-item-title>

          <!-- ACTIONS -->

          <template #append>

            <v-btn icon @click="editTask(task)">

              <v-icon>mdi-pencil</v-icon>

            </v-btn>

            <v-btn icon color="red" @click="deleteTask(task.id)">

              <v-icon>mdi-delete</v-icon>

            </v-btn>

          </template>

        </v-list-item>

      </v-list>

    </v-card>

  </v-container>

</template>
<script setup>

import { ref, computed, onMounted } from "vue";

import { useRouter } from "vue-router";

import { useTaskStore } from "../store/task";

import { supabase } from "../lib/supabase";

const router = useRouter();

const taskStore = useTaskStore();

const newTask = ref("");

const filter = ref("all");

// LOAD

onMounted(() => {

  taskStore.getAllTasks();

});

// LOGOUT (bleibt UI)

const logout = async () => {

  await supabase.auth.signOut();

  router.push("/login");

};

// FILTERED TASKS

const filteredTasks = computed(() => {

  if (!taskStore.tasks) return [];

  if (filter.value === "done") {

    return taskStore.tasks.filter(t => t.completed);

  }

  if (filter.value === "open") {

    return taskStore.tasks.filter(t => !t.completed);

  }

  return taskStore.tasks;

});

// ADD (POST /tasks)

const handleAddTask = () => {

  if (!newTask.value.trim()) return;

  taskStore.addTask(newTask.value);

  newTask.value = "";

};

// EDIT (PUT /tasks/{id})

const editTask = (task) => {

  const title = prompt("Task bearbeiten:", task.title);

  if (!title) return;

  taskStore.updateTask(task.id, title);

};

// DELETE

const deleteTask = (id) => {

  taskStore.deleteTask(id);

};

// TOGGLE (PATCH /complete)

const toggleTask = (task) => {

  taskStore.markAsDone(task.id, !task.completed);

};

</script>