import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import LocalStorageContext from './contexts/LocalStorageContext'
import LocalStorage from './utils/localStorage'
import { CurrentUserProvider } from './contexts/CurrentUserContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

const authstorage = new LocalStorage()
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalStorageContext.Provider value={authstorage}>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </LocalStorageContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
