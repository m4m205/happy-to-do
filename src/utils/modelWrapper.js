import { computed } from 'vue'
export default function (props, emit, name) { 
  return computed({ 
    get: () => props[name], 
    set: (value) => emit(`${name}`, value) 
  })
}