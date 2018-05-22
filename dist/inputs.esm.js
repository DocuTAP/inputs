/*!
 * @docutap/inputs v0.0.0
 * (c) 2018 adriancarriger
 * Released under the MIT License.
 */

var DocutapCheckboxes = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-checkboxes-group",class:{'md-input-invalid': _vm.errors.has(_vm.schema.name)}},[(_vm.schema.label && (!_vm.schema.hideLabel || _vm.errors.has(_vm.schema.name)))?_c('div',{staticClass:"md-checkboxes-group-label"},[_vm._v(_vm._s(_vm.schema.label)+" "),(_vm.errors.has(_vm.schema.name))?_c('span',[_vm._v(_vm._s(_vm.errors.items[0].rule === 'required' ? 'is required' : 'not valid'))]):_vm._e()]):_vm._e(),_vm._l((_vm.schema.values),function(value,key){return _c('md-checkbox',{key:value,attrs:{"name":((_vm.schema.name) + "-" + key),"disabled":_vm.schema.disabled},on:{"change":_vm.onChange},model:{value:(_vm.model[_vm.schema.name][value]),callback:function ($$v) {_vm.$set(_vm.model[_vm.schema.name], value, $$v);},expression:"model[schema.name][value]"}},[_vm._v(_vm._s(value))])}),(_vm.schema.disabledButton)?_c('md-button',{attrs:{"fauxLink":true},nativeOn:{"click":function($event){_vm.schema.disabled = !_vm.schema.disabled;}}},[_vm._v(_vm._s(_vm.schema.disabledButton))]):_vm._e(),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fauxInputValue),expression:"fauxInputValue"},{name:"validate",rawName:"v-validate",value:(_vm.schema.validator),expression:"schema.validator"}],attrs:{"type":"hidden","name":_vm.schema.name},domProps:{"value":(_vm.fauxInputValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.fauxInputValue=$event.target.value;}}})],2)},staticRenderFns: [],
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
  data: function data () {
    return {
      fauxInputValue: ''
    }
  },
  methods: {
    onChange: function onChange () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.fauxInputValue = Object.keys(this$1.model[this$1.schema.name])
          .filter(function (item) { return this$1.model[this$1.schema.name][item]; })
          .join(', ');
      });
    }
  }
};

function install (Vue) {
  Vue.component('docutap-checkboxes', DocutapCheckboxes);
}

var DocutapInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-input-container',{class:{'md-input-invalid': _vm.errors.has(_vm.schema.name) && _vm.showingErrors}},[(_vm.schema.label)?_c('label',[_vm._v(_vm._s(_vm.schema.label)+" "),(_vm.error && _vm.showingErrors)?_c('span',[_vm._v(_vm._s(_vm.errorMessage(_vm.error)))]):_vm._e()]):_vm._e(),_c('md-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validator),expression:"validator"}],attrs:{"scope":_vm.schema.scope,"disabled":_vm.schema.disabled,"phonePattern":_vm.schema.phonePattern,"name":_vm.schema.name,"type":_vm.schema.type,"placeholder":_vm.schema.placeholder},on:{"input":_vm.onInput},nativeOn:{"focus":function($event){_vm.onFocus($event);},"blur":function($event){_vm.onBlur($event);}},model:{value:(_vm.model[_vm.schema.name]),callback:function ($$v) {_vm.$set(_vm.model, _vm.schema.name, $$v);},expression:"model[schema.name]"}}),(_vm.schema.disabledButton)?_c('md-button',{attrs:{"fauxLink":true},nativeOn:{"click":function($event){_vm.schema.disabled = !_vm.schema.disabled;}}},[_vm._v(_vm._s(_vm.schema.disabledButton))]):_vm._e()],1)},staticRenderFns: [],
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
  data: function data() {
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
    showingErrors: function showingErrors() {
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
    error: function error() {
      var this$1 = this;

      return this.errors.items.find(function (item) { return item.field === this$1.schema.name; })
    }
  },
  methods: {
    onInput: function onInput(input) {
      if (input.length) {
        this.touched = true;
      }
      this.validate();
      this.$emit('input', this.mdValue, input);
    },
    onFocus: function onFocus() {
      this.isFocsed = true;
    },
    onBlur: function onBlur(input) {
      this.isFocsed = false;
      this.blured = true;
    },
    validate: function validate() {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$validator.validate(this$1.schema.name, this$1.model[this$1.schema.name]);
      });
    },
    errorMessage: function errorMessage(error) {
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
  mounted: function mounted() {
    if (this.schema.type === 'tel') {
      var phonePattern = this.schema.phonePattern
        ? this.schema.phonePattern.length
        : 'XXX-XXX-XXXX';
      var validators = this.schema.validator.split('|');
      validators.push(("min:" + (phonePattern.length)));
      validators.push(("max:" + (phonePattern.length)));
      this.validator = validators.join('|');
    } else {
      this.validator = this.schema.validator;
    }
    this.validate();
  }
};

function install$1 (Vue) {
  Vue.component('docutap-input', DocutapInput);
}

var DocutapRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-radio-group",class:{'md-input-invalid': _vm.errors.has(_vm.schema.name)}},[(_vm.schema.label)?_c('div',{staticClass:"md-radio-group-label"},[_vm._v(_vm._s(_vm.schema.label)+" "),(_vm.errors.has(_vm.schema.name))?_c('span',[_vm._v(_vm._s(_vm.errors.items[0].rule === 'required' ? 'is required' : 'not valid'))]):_vm._e()]):_vm._e(),_vm._l((_vm.schema.values),function(value,key){return _c('md-radio',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.radioValidator(key)),expression:"radioValidator(key)"}],key:value,attrs:{"disabled":_vm.schema.disabled,"md-value":value,"name":_vm.schema.name},on:{"change":_vm.onChange},model:{value:(_vm.model[_vm.schema.name]),callback:function ($$v) {_vm.$set(_vm.model, _vm.schema.name, $$v);},expression:"model[schema.name]"}},[_vm._v(_vm._s(value))])}),(_vm.schema.disabledButton)?_c('md-button',{attrs:{"fauxLink":true},nativeOn:{"click":function($event){_vm.schema.disabled = !_vm.schema.disabled;}}},[_vm._v(_vm._s(_vm.schema.disabledButton))]):_vm._e()],2)},staticRenderFns: [],
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
    onChange: function onChange ($event) {
      var this$1 = this;

      setTimeout(function () {
        this$1.$validator.validate(this$1.schema.name, this$1.model[this$1.schema.name]);
      });
      this.$emit('change', this.mdValue, $event);
    },
    radioValidator: function radioValidator (key) {
      if (key !== 0) { return '' }
      return ("required|in:," + (this.schema.values.join(',')))
    }
  }
};

function install$2 (Vue) {
  Vue.component('docutap-radio', DocutapRadio);
}

var DocutapSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-input-container',{class:{'md-input-invalid': _vm.errors.has(_vm.schema.name)}},[(_vm.schema.label)?_c('label',[_vm._v(_vm._s(_vm.schema.label)+" "),(_vm.errors.has(_vm.schema.name))?_c('span',[_vm._v(_vm._s(_vm.errors.items[0].rule === 'required' ? 'is required' : 'not valid'))]):_vm._e()]):_vm._e(),_c('md-select',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.schema.validator),expression:"schema.validator"}],attrs:{"name":_vm.schema.name,"disabled":_vm.schema.disabled},on:{"input":_vm.onInput},model:{value:(_vm.model[_vm.schema.name]),callback:function ($$v) {_vm.$set(_vm.model, _vm.schema.name, $$v);},expression:"model[schema.name]"}},_vm._l((_vm.schema.values),function(value){return _c('md-option',{key:value,attrs:{"value":value}},[_vm._v(_vm._s(value))])})),(_vm.schema.disabledButton)?_c('md-button',{attrs:{"fauxLink":true},nativeOn:{"click":function($event){_vm.schema.disabled = !_vm.schema.disabled;}}},[_vm._v(_vm._s(_vm.schema.disabledButton))]):_vm._e()],1)},staticRenderFns: [],
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
    onInput: function onInput () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$validator.validate(this$1.schema.name, this$1.model[this$1.schema.name]);
      });
    }
  }
};

function install$3 (Vue) {
  Vue.component('docutap-select', DocutapSelect);
}

var options = {
  DocutapCheckboxes: install,
  DocutapInput: install$1,
  DocutapRadio: install$2,
  DocutapSelect: install$3
};

options.install = function (Vue) {
  for (var component in options) {
    var componentInstaller = options[component];

    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller);
    }
  }
};

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(options.install);
}

options.version = '0.0.0';

export default options;
