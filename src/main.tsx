import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/global';
import { theme } from '@/styles/theme';
import { Blog, Company, Fav, Home, Landing, Login, MyPage, UserInput } from '@/pages';
import Layout, { ProtectedRoute, SidebarLayout } from '@/layout';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={'/landing'} replace />,
      },
      {
        path: 'landing',
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <SidebarLayout />,
            children: [
              {
                path: 'userInput',
                element: <UserInput />,
              },
              {
                path: 'home',
                element: <Home />,
              },
              {
                path: 'fav',
                element: <Fav />,
              },
              {
                path: 'myPage',
                element: <MyPage />,
              },
              {
                path: ':companyId',
                element: <Company />,
              },
            ],
          },
          {
            path: ':companyId/:blogId',
            element: <Blog />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </>,
);
