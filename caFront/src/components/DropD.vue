<template>
    <div class="dropdown">
      <label>{{ label }}</label>
      <select class="select" v-model="selectedOption" @change="onChange">
        <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'Dropdown',
    props: {
      label: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        default: ''
      }
    },
    setup(props, { emit }) {
      const selectedOption = ref<string>(props.value)
  
      const onChange = () => {
        const selectedValue = selectedOption.value
        emit('update:value', selectedValue)
      }
  
      return {
        selectedOption,
        onChange
      }
    }
  })
  </script>
  
  <style scoped>
  .dropdown {
    margin-bottom: 1rem;
    position: relative;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23333' stroke-width='1.5' fill='none' fill-rule='evenodd' stroke-linecap='square'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem top 50%;
    transition: all 0.2s ease-in-out;
  }
  
  .select:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(39, 102, 204, 0.2);
  }
  
  .select:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
  
  .select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .select::-ms-expand {
    display: none;
  }
  
  .select option {
    background-color: #fff;
    color: #333;
  }
  
  .select option:checked {
    background-color: #eee;
  }
  
  .select option:hover {
    background-color: #f5f5f5;
  }
  
  .select option:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .select option:checked:hover {
    background-color: #eee;
  }
  
  .select option:checked:disabled {
    background-color: #fff;
  }
  
  .select option:not(:checked):disabled {
    color: #bbb;
  }
  
  .select option:not(:checked):not(:disabled):hover {
    background-color: #f5f5f5;
  }
  
  .select-icon {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    pointer-events: none;
  }
  </style>
  