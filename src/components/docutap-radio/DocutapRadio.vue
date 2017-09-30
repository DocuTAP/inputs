<template>
  <div :class="{'md-input-invalid': errors.has(schema.name)}" class="md-radio-group">
    <div class="md-radio-group-label" v-if="schema.label">{{schema.label}} <span v-if="errors.has(schema.name)"> {{errors.items[0].rule === 'required' ? 'is required' : 'not valid'}}</span></div>
    <md-radio @change="onChange" v-for="(value, key) in schema.values" :key="value" :md-value="value" v-model="model[schema.name]" :name="schema.name" v-validate="radioValidator(key)">{{value}}</md-radio>
  </div>
</template>

<script>
export default {
  name: 'docutap-radio',
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
    onChange () {
      setTimeout(() => {
        this.$validator.validate(this.schema.name, this.model[this.schema.name])
      })
    },
    radioValidator (key) {
      if (key !== 0) { return '' }
      return `required|in:,${this.schema.values.join(',')}`
    }
  }
}
</script>
