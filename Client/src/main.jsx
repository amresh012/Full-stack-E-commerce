import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import  Store from "./store/Store.js"
import {Provider} from "react-redux"
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ScrollToTop from './essentials/ScrollToTop.jsx'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  <Provider store={Store}>
   <BrowserRouter>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      <ScrollToTop/>
    </BrowserRouter>
   </Provider>
  </QueryClientProvider>
  </React.StrictMode>
);
