import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditProfileView from './components/EditProfileView';
import DashboardView from './components/DashboardView';
import PublicProfileView from './components/PublicProfileView';
import SignOutView from './components/SignOutView';
import ChooseUserNameView from './routes/ChooseUserNameView';
import LoginView from './routes/LoginView';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='login' element={<LoginView />} />
      <Route path='dashboard' element={<DashboardView />} />
      <Route path='dashboard/profile' element={<EditProfileView />} />
      <Route path='signout' element={<SignOutView />} />
      <Route path='u/:username' element={<PublicProfileView />} />
      <Route path='choose-username' element={<ChooseUserNameView />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
