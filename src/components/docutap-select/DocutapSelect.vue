<template>
  <md-input-container :class="{'md-input-invalid': errors.has(schema.name)}">
    <label v-if="schema.label">{{schema.label}} <span v-if="errors.has(schema.name)"> {{errors.items[0].rule === 'required' ? 'required' : 'not valid'}}</span></label>
    <md-select v-validate="schema.validator" :name="schema.name" v-model="model[schema.name]">
      <md-option v-for="value in schema.values" :key="value" :value="value">{{value}}</md-option>
    </md-select>
  </md-input-container>
</template>

<script>
export default {
  name: 'docutap-input',
  inject: ['$validator'],
  props: {
    model: {
      type: Object
    },
    schema: {
      type: Object
    }
  }
}
</script>
