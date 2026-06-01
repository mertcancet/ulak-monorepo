import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', 'routes/root-redirect.tsx'),

  route(':locale', 'routes/locale-layout.tsx', [
    index('routes/home.tsx'),
    route('demo', 'routes/demo.tsx'),
    route('login', 'routes/locale-login-redirect.tsx'),
    route('*', 'routes/locale-catchall-redirect.tsx'),
  ]),

  route('*', 'routes/global-catchall-redirect.tsx'),
] satisfies RouteConfig;
