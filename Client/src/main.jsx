import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import  Store from "./store/Store.js"
import {Provider} from "react-redux"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ScrollToTop from './essentials/ScrollToTop.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 4,
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
  <QueryClientProvider client={queryClient}>
   <BrowserRouter>
    <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ScrollToTop/>
    </BrowserRouter>
  </QueryClientProvider>
   </Provider>
);


