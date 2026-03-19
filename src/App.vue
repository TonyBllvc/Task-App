<script setup lang="ts">
  import { computed, ref } from 'vue';
  import TaskForm from './components/TaskForm.vue';
  import type { TaskType } from './interface';
  import TaskLists from './components/TaskLists.vue';


  const message = ref<string>("Tasks App");
  const tasks = ref<TaskType[]>([])

  const totalDone = computed(() => (
    tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0)
  ))

  function addTask(newTask: string | null): void {
    tasks.value.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false,
    })
  }

  function toggleDone(id: string) {
    const task = tasks.value.find(data => data?.id === id);
    if (task) {
      task.done = !task.done;
    }
  }

  function removeTask(id: string) {
    const index = tasks.value.findIndex(data => data.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
    }
  }
  
</script>

<template>
  <main>
    <h1> {{ message }} </h1>
    <TaskForm @add-task="addTask" />
    <h3 v-if="tasks?.length === 0">
      Add a task to get started
    </h3>
    <h3 v-else> {{ totalDone }} / {{ tasks?.length }} tasks completed </h3>
    <TaskLists :tasks @toggle-done="toggleDone" @remove-task="removeTask" />
    <!-- I did not use ":tasks="tasks", because Vue 3 now allows for usage of :tasks alone, if they bare same name  -->
  </main>
</template>

<style>
  /* <style scoped> */
  /* using scoped in the "style" layer, simply lets vue know that the styling should strictly only apply in this component  */

  main {
    max-width: 800px;
    margin: 1rem auto;
    padding: 0 30px;
  }

  .button-container {
    display: flex;
    justify-content: end;
  }

</style>
