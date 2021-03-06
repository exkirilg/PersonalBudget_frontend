import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./State/Store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"

import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { SignInPage } from "./Pages/SignInPage";
import { SignInPageDemo } from "./Pages/SignInPageDemo";
import { SignUpPage } from "./Pages/SignUpPage";
import { ContactsPage } from "./Pages/ContactsPage";
import { NotFoundPage } from "./Pages/NotFoundPage";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="signinDemo" element={<SignInPageDemo />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
