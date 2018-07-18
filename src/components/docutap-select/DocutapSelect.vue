<template>
  <md-input-container :class="{'md-input-invalid': errors.has(schema.name)}">
    <label v-if="schema.label">{{schema.label}} <span v-if="errors.has(schema.name)"> {{errors.items[0].rule === 'required' ? 'is required' : 'not valid'}}</span></label>
    <md-select @input="onInput" v-validate="schema.validator" :name="schema.name" :disabled="schema.disabled" v-model="model[schema.name]" :class="schema.class">
      <md-option v-for="value in schema.values" :key="value" :value="value">{{value}}</md-option>
    </md-select>
    <md-button v-if="schema.disabledButton" @click.native="schema.disabled = !schema.disabled" :fauxLink="true">{{schema.disabledButton}}</md-button>
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
  },
  methods: {
    onInput () {
      this.$nextTick(() => {
        this.$validator.validate(this.schema.name, this.model[this.schema.name])
      })
    }
  }
}
</script>
