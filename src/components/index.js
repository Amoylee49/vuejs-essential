import { setupMessageComponent } from './Message.vue';

// 注册全局组件
export function setupGlobComponents(app) {
  setupMessageComponent(app);
}
