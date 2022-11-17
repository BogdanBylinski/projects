import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import App from "./App";
// import { UserProvider } from "./contexts/user.context";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import { CategoriesProvider } from "./contexts/categories.context";
// import { CartProvider } from "./contexts/cart.context";
import { persistor, store } from "./store/store";

//stripe
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from "./utils/stripe/stripe.utils";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate  loading={null} persistor={persistor}>

      <BrowserRouter>
        {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
            {/* <CartProvider> */}
            <Elements stripe={stripePromise}>

              <App />
            </Elements >
            {/* </CartProvider> */}
          {/* </CategoriesProvider> */}
        {/* </UserProvider> */}
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();