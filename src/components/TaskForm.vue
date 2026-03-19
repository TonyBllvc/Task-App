<template>
    <div>
        <form @submit.prevent="formSubmit">
            <label>
                New Task
                <input type="text" name="newTask" v-model="newTask" :aria-invalid="errorState"
                    aria-describedby="invalid-helper">
            </label>
            <small id="invalid-helper" v-if="errorState" style="color: red;">
                {{ error }}
            </small>
            <div class="button-container">
                <button type="button">
                    Add
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const emit = defineEmits<{ addTask: [newTask: string | null] }>();

    const newTask = ref<string | null>(null);
    const error = ref<string | null>(null); // error message
    const errorState = ref<boolean>(false); // error handler

    const formSubmit = () => {
        if (!newTask.value?.trim()) {
            errorState.value = true;
            error.value = 'Task cannot be empty';
            return;
        };

        emit('addTask', newTask.value);
        newTask.value = null;
        errorState.value = false;
        error.value = null;
    }
</script>

<style scoped></style>