// unocss.config.js
import { defineConfig } from 'unocss'

export default defineConfig({
    // 添加自定义规则
    rules: [
        ['flex-4', { flex: '4' }],
        ['flex-8', { flex: '8' }],
    ],
})
