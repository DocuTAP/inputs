# DocuTAP Inputs [![npm version](https://badge.fury.io/js/%40docutap-api%2Finputs.svg)](https://badge.fury.io/js/%40docutap-api%2Finputs)

DocuTAP Inputs is a validation library built for [Vue.js](https://vuejs.org/) that builds upon [DocuTAP UI](https://github.com/DocuTAP/ui)

## Features

- Implements the [Vee Validate](https://github.com/baianat/vee-validate) validation library for Vue.js into [DocuTAP UI](https://github.com/DocuTAP/ui) componenets
- Validations made easy! Just pass a validator object as show in the usage section below
- Can be consumed via [DocuTAP Form](https://github.com/DocuTAP/form) to avoid common boilerplate

## Installation

DocuTAP Inputs requires the following dependencies: [Vee Validate](https://github.com/baianat/vee-validate) and [DocuTAP UI](https://github.com/DocuTAP/ui).

```bash
# Peer dependency
npm install --save vee-validate
# @docutap dependencies
npm install --save @docutap-api/ui @docutap-api/inputs
```

## Usage

`main.js`

```javascript
import DocutapInputs from '@docutap/inputs';
import DocutapUi from '@docutap/ui';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(DocutapUi);
Vue.use(DocutapInputs);
Vue.use(VeeValidate);
```

`App.vue`

```html
<template>
  <form novalidate @submit.prevent="validateBeforeSubmit">
    <docutap-select :model="model" :schema="schema"></docutap-select>
  </form>
</template>

<script>
export default {
  name: 'my-app',
  inject: ['$validator'],
  data () {
    return {
      model: {
        'my-select-input': ''
      },
      schema: {
        label: 'State',
        name: 'my-select-input',
        validator: 'required',
        values: ['South Dakota', 'North Dakota', 'Alaska']
      }
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log('Submitted')
          return
        }
        console.log('Form not valid')
      })
    }
  }
}
</script>
```
