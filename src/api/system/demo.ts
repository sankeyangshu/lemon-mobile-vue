import { http } from '@/lib/request';

// api接口
const api = {
  example: '/api/example', // 示例接口
};

/**
 * 获取示例数据
 * @returns 示例数据
 */
export async function getExampleAPI() {
  return http.get<{ content: string; date: number }>(api.example);
}
