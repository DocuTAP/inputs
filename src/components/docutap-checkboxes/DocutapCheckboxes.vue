<template>
  <div :class="{'md-input-invalid': errors.has(schema.name)}" class="md-checkboxes-group">
    <div class="md-checkboxes-group-label" v-if="schema.label">{{schema.label}} <span v-if="errors.has(schema.name)"> {{errors.items[0].rule === 'required' ? 'required' : 'not valid'}}</span></div>
    <md-checkbox v-for="(value, key) in schema.values" :key="value" :name="`${schema.name}-${key}`" @change="onChange" v-model="model[schema.name][value]">{{value}}</md-checkbox>
    <input type="hidden" :name="schema.name" v-model="fauxInputValue" v-validate="schema.validator" />
  </div>
</template>

<script>
export default {
  name: 'docutap-checkboxes',
  inject: ['$validator'],
  props: {
    model: {
      type: Object
    },
    schema: {
      type: Object
    }
  },
  data () {
    return {
      fauxInputValue: ''
    }
  },
  methods: {
    onChange () {
      this.$nextTick(() => {
        this.fauxInputValue = Object.keys(this.model[this.schema.name])
          .filter(item => this.model[this.schema.name][item])
          .join(', ')
      })
    }
  }
}
</script>
