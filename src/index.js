import DocutapCheckboxes from './components/docutap-checkboxes'
import DocutapInput from './components/docutap-input'
import DocutapRadio from './components/docutap-radio'
import DocutapSelect from './components/docutap-select'

const options = {
  DocutapCheckboxes,
  DocutapInput,
  DocutapRadio,
  DocutapSelect
}

options.install = (Vue) => {
  for (const component in options) {
    const componentInstaller = options[component]

    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller)
    }
  }
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(options.install)
}

options.version = '__VERSION__'

export default options
