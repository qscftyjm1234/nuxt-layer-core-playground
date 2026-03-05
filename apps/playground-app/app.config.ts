export default defineAppConfig({
  core: {
    branding: {
      name: '松凌科技 Playground',
      shortName: 'SL Playground',
      logo: '/images/logo.png',
      icon: '/favicon.ico',
      copyright: '© 2026 Softleader Technical Team. All rights reserved.'
    },
    meta: {
      //   title: "松凌科技前端開發包",
      description: '企業級 Nuxt 3 核心架構，搭載原子化組件與動態配置系統。',
      author: 'Softleader Front-end Team',
      lang: 'zh-TW'
    },
    layout: {
      menuStyle: 'sidebar',
      sidebar: {
        width: 260,
        collapsed: false,
        title: '核心控制台'
      },
      header: {
        fixed: true,
        search: true,
        searchPlaceholder: '搜尋組件與文件...'
      },
      footer: {
        visible: true
      }
    },
    theme: {
      primaryColor: '#2563eb',
      borderRadius: 12,
      animation: true,
      spacingSize: 'medium'
    },
    network: {
      apiBaseUrl: '/api/v1',
      proxy: {
        '/api/v1': {
          target: 'http://dev-api-server:8080',
          changeOrigin: true,
          rewrite: '^/api/v1'
        }
      }
    },
    features: {
      enableWatermark: false,
      enableAuth: true,
      enableLog: true
    }
  }
})
