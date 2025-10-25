import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id',
    renderMode: RenderMode.Server // excludes from prerender
  },
  {
    path: 'checkout/:cartId',
    renderMode: RenderMode.Server // excludes from prerender
  },
  // Add other parameterized routes as needed
  {
    path: '**',
    renderMode: RenderMode.Prerender // catch-all for static routes
  }
];
