# DocuTAP Inputs

DocuTAP Inputs is a validation library built for [Vue.js](https://vuejs.org/) that builds upon [DocuTAP UI](https://bitbucket.org/docutap/ui/overview)

## Features

* Implements the [Vee Validate](https://github.com/baianat/vee-validate) validation library for Vue.js into [DocuTAP UI](https://bitbucket.org/docutap/ui/overview) componenets
* Validations made easy! Just pass a validator object as show in the usage section below
* Can be consumed via [DocuTAP Form](https://bitbucket.org/docutap/form) to avoid common boilerplate

## Installation

DocuTAP Inputs requires the following dependencies: [Vee Validate](https://github.com/baianat/vee-validate) and [DocuTAP UI](https://bitbucket.org/docutap/ui/overview).

```bash
npm install --save vee-validate
npm install --save git+ssh://git@bitbucket.org/docutap/inputs.git#d31f3aa
npm install --save git+ssh://git@bitbucket.org/docutap/ui.git#4ef21b4
```

When updating the commit-ish from Bitbucket make sure to source from the [`dist` branch](https://bitbucket.org/docutap/inputs/branch/dist).

## Usage

`main.js`

```javascript
import DocutapInputs from '@docutap/inputs'
import DocutapUi from '@docutap/ui'
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(DocutapUi)
Vue.use(DocutapInputs)
Vue.use(VeeValidate)
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
