<template>
  <md-input-container :class="{'md-input-invalid': errors.has(schema.name) && showingErrors}">
    <label v-if="schema.label">{{schema.label}} <span v-if="error && showingErrors"> {{errorMessage(error)}}</span></label>
    <md-input :scope="schema.scope" v-validate="validator" :disabled="schema.disabled" :phonePattern="schema.phonePattern" :name="schema.name" :type="schema.type" v-model="model[schema.name]" @input="onInput" @focus.native="onFocus" @blur.native="onBlur" :placeholder="schema.placeholder"></md-input>
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
    },
    showErrors: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      validator: '',
      blured: false,
      touched: false,
      isFocsed: false
    }
  },
  computed: {
    // Show errors on blur
    // if the field that has been touched
    // or the submit button was pressed.
    showingErrors() {
      if (this.showErrors) {
        return true
      }

      if (this.schema.showErrorsIfDirtyOrUnfocused) {
        return this.touched || !this.isFocsed
      }

      return (
        (!this.isFocsed || this.schema.showErrorsIfFocused) &&
        (this.touched || this.schema.showErrorsIfPristine)
      )
    },
    error() {
      return this.errors.items.find(item => item.field === this.schema.name)
    }
  },
  methods: {
    onInput(input) {
      if (input.length) {
        this.touched = true
      }
      this.validate()
      this.$emit('input', this.mdValue, input)
    },
    onFocus() {
      this.isFocsed = true
    },
    onBlur(input) {
      this.isFocsed = false
      this.blured = true
    },
    validate() {
      this.$nextTick(() => {
        this.$validator.validate(this.schema.name, this.model[this.schema.name])
      })
    },
    errorMessage(error) {
      if (error.rule === 'required') {
        return 'is required'
      }

      if (
        this.schema.errorMessages !== undefined &&
        error.rule in this.schema.errorMessages
      ) {
        return this.schema.errorMessages[error.rule]
      }

      return 'not valid'
    }
  },
  mounted() {
    if (this.schema.type === 'tel') {
      const phonePattern = this.schema.phonePattern
        ? this.schema.phonePattern.length
        : 'XXX-XXX-XXXX'
      const validators = this.schema.validator.split('|')
      validators.push(`min:${phonePattern.length}`)
      validators.push(`max:${phonePattern.length}`)
      this.validator = validators.join('|')
    } else {
      this.validator = this.schema.validator
    }
    this.validate()
  }
}
</script>
