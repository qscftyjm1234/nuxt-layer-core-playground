export interface ComponentApiDoc {
  name: string
  description: string
  importPath: string
  summary: string
  props: Array<{ name: string, type: string, default: string, desc: string }>
  emits: Array<{ name: string, payload: string, desc: string }>
  methods: Array<{ name: string, params: string, desc: string }>
  slots: Array<{ name: string, desc: string }>
  codeExample: string
}

export interface FeatureApiDoc {
  name: string
  description: string
  importPath: string
  summary: string
  methods: Array<{ name: string, params: string, desc: string, returnType: string }>
  examples: Array<{ title: string, code: string }>
}
