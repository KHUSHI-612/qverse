import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AskQuestion from './pages/AskQuestion.jsx';
import QuestionDetails from './pages/QuestionDetails.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ask" element={<AskQuestion />} />
      <Route path="/question/:id" element={<QuestionDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}


