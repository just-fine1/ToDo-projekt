<template>

  <v-container class="py-6">

    <!-- TITLE -->

    <v-card class="pa-4 mb-4 text-center">

      <h1>TODO LIST</h1>

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

              v-model="task.completed"

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

import { ref, computed } from 'vue'

const newTask = ref('')

const filter = ref('all')

const tasks = ref([

  { id: 1, title: 'Beispiel Task', completed: false }

])

/* FILTER */

const filteredTasks = computed(() => {

  if (filter.value === 'done') {

    return tasks.value.filter(t => t.completed)

  }

  if (filter.value === 'open') {

    return tasks.value.filter(t => !t.completed)

  }

  return tasks.value

})

/* ADD */

function handleAddTask() {

  if (!newTask.value.trim()) return

  tasks.value.push({

    id: Date.now(),

    title: newTask.value,

    completed: false

  })

  newTask.value = ''

}

/* CHANGE */

function toggleTask(task) {

  task.completed = !task.completed

}

/* DELETE */

function deleteTask(id) {

  tasks.value = tasks.value.filter(t => t.id !== id)

}

/* EDIT */

function editTask(task) {

  const newTitle = prompt('Task bearbeiten:', task.title)

  if (newTitle) task.title = newTitle

}

</script>