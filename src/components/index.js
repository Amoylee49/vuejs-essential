import { setupMessageComponent } from './Message';

// 注册全局组件
export function setupGlobComponents(app) {
  setupMessageComponent(app);
}
