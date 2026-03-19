<template>
    <TransitionGroup name="list" tag="div" class="task-list">
        <article v-for="task in tasks" :key="task?.id" class="article">
            <label for="check">
                <input type="checkbox" name="check" :checked="task.done" @input="emits('toggleDone', task.id)">
                <span :class="{ done: task.done }">{{ task.title }}</span>
            </label>
            <button class="outline secondary" @click="emits('removeTask', task?.id)">
                <X />
            </button>
        </article>
    </TransitionGroup>
</template>

<script lang="ts" setup>
    import { X } from 'lucide-vue-next';
    import type { TaskType } from '../interface';

    defineProps<{ tasks: TaskType[] }>();

    const emits = defineEmits<{ toggleDone: [id: string]; removeTask: [id: string] }>()


</script>

<style scoped>

    .task-list {
        margin-top: 1rem;
    }

    .done {
        text-decoration: line-through;
    }

    .article {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 1.0s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(300px);
    }

    /* Important: takes leaving items out of layout flow */
    .list-leave-active {
        position: absolute;
    }
</style>