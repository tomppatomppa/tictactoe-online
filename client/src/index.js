import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import LocalStorageContext from './contexts/LocalStorageContext'
import LocalStorage from './utils/localStorage'
import { CurrentUserProvider } from './contexts/CurrentUserContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const root = ReactDOM.createRoot(document.getElementById('root'))

const authstorage = new LocalStorage()
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log('query error')
      if (query.state.data !== undefined) {
        console.log(`Something went wrong: ${error.message}`)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error.message) toast.error(JSON.stringify(error.response.data.error))
    },
  }),
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocalStorageContext.Provider value={authstorage}>
          <CurrentUserProvider>
            <App />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </CurrentUserProvider>
        </LocalStorageContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
