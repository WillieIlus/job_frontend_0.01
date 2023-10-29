<template>
  <div>
    <div class="">
    <label
      class="text-lg font-semibold text-gray-700"
      v-if="label"
      :for="uuid"
    >
      {{ label }}: 
    </label>
    <input
      class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-indigo-300 border border-indigo-300"
      v-bind="{ ...$attrs, onInput: updateValue }"
      :id="uuid"
      :value="modelValue"
      :placeholder="label"
    >
  </div>
  </div>
</template>

<script>
import SetupFormComponent from '@/features/SetupFormComponent'
import UniqueID from '@/features/UniqueID'

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props, context) {
    const { updateValue } = SetupFormComponent(props, context)
    const uuid = UniqueID().getID()

    return {
      updateValue,
      uuid
    }
  }
}
</script>


