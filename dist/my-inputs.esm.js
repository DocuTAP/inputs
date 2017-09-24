/*!
 * my-inputs v0.0.0
 * (c) 2017 adriancarriger
 * Released under the MIT License.
 */

var DocutapCheckboxes = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-checkboxes-group",class:{'md-input-invalid': _vm.errors.has(_vm.schema.name)}},[(_vm.schema.label)?_c('div',{staticClass:"md-checkboxes-group-label"},[_vm._v(_vm._s(_vm.schema.label)+" "),(_vm.errors.has(_vm.schema.name))?_c('span',[_vm._v(_vm._s(_vm.errors.items[0].rule === 'required' ? 'required' : 'not valid'))]):_vm._e()]):_vm._e(),_vm._l((_vm.schema.values),function(value,key){return _c('md-checkbox',{key:value,attrs:{"name":((_vm.schema.name) + "-" + key)},on:{"change":_vm.onChange},model:{value:(_vm.model[_vm.schema.name][value]),callback:function ($$v) {_vm.$set(_vm.model[_vm.schema.name], value, $$v);},expression:"model[schema.name][value]"}},[_vm._v(_vm._s(value))])}),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fauxInputValue),expression:"fauxInputValue"},{name:"validate",rawName:"v-validate",value:(_vm.schema.validator),expression:"schema.validator"}],attrs:{"type":"hidden","name":_vm.schema.name},domProps:{"value":(_vm.fauxInputValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.fauxInputValue=$event.target.value;}}})],2)},staticRenderFns: [],
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

var options = {
  DocutapCheckboxes: install
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
