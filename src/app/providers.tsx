import { RouterProvider } from 'react-router';
import { router } from '@/app/router';

export function Providers() {
  return <RouterProvider router={router} />;
}
