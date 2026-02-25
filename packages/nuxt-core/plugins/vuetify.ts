import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'corporateTrust',
      themes: {
        corporateTrust: {
          dark: false,
          colors: {
            // Corporate Trust Palette
             primary: '#4f46e5', // primary-600
             secondary: '#64748b', // gray-500
             accent: '#818cf8', // primary-400
             error: '#ef4444',
             info: '#3b82f6',
             success: '#22c55e',
             warning: '#f59e0b',
             background: '#f8fafc', // gray-50
             surface: '#ffffff',
          },
          variables: {
            'border-color': '#e2e8f0', // gray-200
            'theme-on-background': '#0f172a', // gray-900
            'theme-on-surface': '#1e293b', // gray-800
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
