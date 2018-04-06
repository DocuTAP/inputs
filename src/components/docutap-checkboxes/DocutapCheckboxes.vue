<template>
  <div :class="{'md-input-invalid': errors.has(schema.name)}" class="md-checkboxes-group">
    <div class="md-checkboxes-group-label" v-if="schema.label && (!schema.hideLabel || errors.has(schema.name))">{{schema.label}} <span v-if="errors.has(schema.name)"> {{errors.items[0].rule === 'required' ? 'is required' : 'not valid'}}</span></div>
    <md-checkbox v-for="(value, key) in schema.values" :key="value" :name="`${schema.name}-${key}`" :disabled="schema.disabled" @change="onChange" v-model="model[schema.name][value]">{{value}}</md-checkbox>
    <md-button v-if="schema.disabledButton" @click.native="schema.disabled = !schema.disabled" :fauxLink="true">{{schema.disabledButton}}</md-button>
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
