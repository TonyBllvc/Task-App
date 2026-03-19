<template>
    <main>
        <h1> {{ message }} </h1>
        <TaskForm @add-task="addTask" />
        <h3 v-if="tasks?.length === 0">
            Add a task to get started
        </h3>
        <h3 v-else> {{ totalDone }} / {{ tasks?.length }} tasks completed </h3>
        <div v-if="tasks.length" class="button-container">
            <FilterButton :filterState="filter" :filter="'all'" @set-filter="setFilter" />
            <FilterButton :filterState="filter" :filter="'todo'" @set-filter="setFilter" />
            <FilterButton :filterState="filter" :filter="'done'" @set-filter="setFilter" />
        </div>
        <TaskLists :tasks="filteredTasks" @toggle-done="toggleDone" @remove-task="removeTask" />
        <!-- I did not use ":tasks="tasks", because Vue 3 now allows for usage of :tasks alone, if they bare same name  -->
    </main>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import TaskForm from '../components/TaskForm.vue';
    import type { TaskFilter, TaskType } from '../interface';
    import TaskLists from '../components/TaskLists.vue';
    import FilterButton from '../components/base/FilterButton..vue';


    const message = ref<string>("Tasks App");
    const tasks = ref<TaskType[]>([]);
    const filter = ref<TaskFilter>('all')

    const totalDone = computed((): number => (
        tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0)
    ))

    const filteredTasks = computed(() => {
        switch (filter.value) {
            case 'all':
                return tasks.value;
            case 'done':
                return tasks.value.filter((task) => task.done);
            case 'todo':
                return tasks.value.filter((task) => !task.done);
        }
        return tasks.value;
    })

    function addTask(newTask: string | null): void {
        tasks.value.push({
            id: crypto.randomUUID(),
            title: newTask,
            done: false,
        })
    }

    function toggleDone(id: string): void {
        const task = tasks.value.find(data => data?.id === id);
        if (task) {
            task.done = !task.done;
        }
    }

    function removeTask(id: string): void {
        const index = tasks.value.findIndex(data => data.id === id);
        if (index !== -1) {
            tasks.value.splice(index, 1);
        }
    }

    function setFilter(value: TaskFilter): void {
        filter.value = value;
    }

</script>

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
        gap: 0.5rem;
    }

</style>
