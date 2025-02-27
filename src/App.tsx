import '@mantine/core/styles.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion'
import {
  Button,
  ColorSchemeScript,
  createTheme,
  MantineProvider,
  rem,
} from '@mantine/core'
import { ToastContainer, Flip } from 'react-toastify'

import classes from './App.module.css'

import { FullLayout } from './pages/layout/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import Home from './pages/home/Home'

const theme = createTheme({
  autoContrast: true,
  luminanceThreshold: 0.3,
  defaultRadius: 'sm',
  activeClassName: 'active',
  defaultGradient: {
    from: 'violet',
    to: 'pink',
    deg: 55,
  },
  colors: {
    darkPink: [
      '#faedff',
      '#edd9f7',
      '#d8b1ea',
      '#c186dd',
      '#ae62d2',
      '#a34bcb',
      '#9d3fc9',
      '#8931b2',
      '#7a2aa0',
      '#6b218d',
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 0,
    },
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <FullLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/page',
        element: <ErrorBoundary />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme="dark" />
      <MantineProvider
        defaultColorScheme="dark"
        theme={theme}
        stylesTransform={emotionTransform}
      >
        <MantineEmotionProvider>
          <RouterProvider router={router} />
          <ToastContainer
            stacked
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Flip}
          />
        </MantineEmotionProvider>
      </MantineProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      )}
    </QueryClientProvider>
  )
}

export default App
