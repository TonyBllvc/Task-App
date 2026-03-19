<template>
    <button :class="{ contrast: filter === filterState, secondary: filter !== filterState }" type="button" @click="emits('setFilter', props.filter)">
        {{ props.filter }}
        <!-- or -->
        <!-- {{ filter }} -->
    </button>
</template>

<script lang="ts" setup>
    import type { TaskFilter } from '../../interface';


    const props = defineProps<{ filter: TaskFilter; filterState: TaskFilter; }>()

    const emits = defineEmits<{ setFilter: [filter: TaskFilter] }>();

</script>

<style scoped>
    button {
        text-transform: capitalize;
    }
</style>