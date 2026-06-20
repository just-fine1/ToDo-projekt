<template>

  <v-container class="py-6">

    <!-- HEADER -->

    <v-card class="pa-4 mb-4">

      <v-row justify="space-between" align="center">

        <v-col cols="auto">

          <h2>TODO LIST</h2>

        </v-col>

        <!-- Logout Button -->

        <v-col cols="auto">

          <v-btn color="red" variant="flat" @click="logout">

            <v-icon start icon="mdi-logout" />

            Logout

          </v-btn>

        </v-col>

      </v-row>

    </v-card>

    <!-- INPUT -->

    <v-row class="mb-4">

      <v-col cols="12" md="5">

        <v-text-field

          v-model="newTask"

          label="Neue Aufgabe"

          variant="outlined"

        />

      </v-col>

       <!-- Filter -->

      <v-col cols="12" md="4">

        <v-select

          v-model="filter"

          :items="['all','open','done']"

          label="Filter"

          variant="outlined"

        />

      </v-col>

      <!-- ADD -->

      <v-col cols="12" md="3">

        <v-btn block color="primary" @click="handleAddTask">

          Add Task

        </v-btn>

      </v-col>

    </v-row>

    <!-- LIST -->

    <v-card>

      <v-list>

        <!-- TOGGLE -->

        <v-list-item
                
          v-for="task in filteredTasks"

          :key="task.id"
          

        >

          

          <v-list-item-title

          @click="toggleTask(task)"

          style="cursor: pointer;"

>

          <span :style="{

          textDecoration: task.completed ? 'line-through' : 'none'

          }">

          {{ task.title }}

          </span>

          </v-list-item-title>

          <!-- Edit -->

            <template #append>

            <v-btn

              variant="flat"

              color="blue"

              class="mr-2"

              @click="editTask(task)"

            >

              <v-icon start icon="mdi-pencil" />

              Edit

            </v-btn>  

            <!-- Delete -->

            <v-btn

              variant="flat"

              color="red"

              @click="deleteTask(task.id)"

            >

              <v-icon start icon="mdi-close" />

              Delete

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

// LOGOUT 

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