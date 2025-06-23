<template>
  <teleport to="body">
    <div
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
      @click.self="close"
    >
      <div class="bg-white rounded-xl !p-[20px] w-[500px]">
        <h2 class="text-xl font-bold !mb-[16px]">Add New Task</h2>

        <Form :validation-schema="schema" @submit="submitTask" class="flex flex-col gap-4">
          <div>
            <Field
              name="title"
              v-slot="{ field, errorMessage }"
            >
              <input
                v-bind="field"
                type="text"
                placeholder="Task title"
                class="border !p-[8px] rounded w-full"
              />
              <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
            </Field>
          </div>

          <div>
            <Field
              name="description"
              v-slot="{ field, errorMessage }"
            >
              <textarea
                v-bind="field"
                placeholder="Task description"
                class="border !p-[8px] rounded w-full resize-none"
                rows="3"
              />
              <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
            </Field>
          </div>

          <div class="flex justify-end gap-[16px]">
            <button type="button" @click="close" class="text-gray-500 hover:underline">Cancel</button>
            <button type="submit" class="min-w-[100px] bg-blue-500 text-white !p-[8px] rounded hover:bg-blue-600">Add</button>
          </div>
        </Form>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['close', 'add'])

const schema = yup.object({
  title: yup.string().required('Title is required').min(3, 'At least 3 characters'),
  description: yup.string().required('Description is required').min(5, 'At least 5 characters'),
})

const submitTask = (values) => {
  emit('add', {
    title: values.title.trim(),
    description: values.description.trim(),
  })
  close()
}

const close = () => emit('close')
</script>
