import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DayList } from './components/Day/DayList';
import { DayDetail } from './components/Day/DayDetail';
import { TopicDetail } from './components/Topic/TopicDetail';
import { ExamQuiz } from './components/Quiz/ExamQuiz';
import { Login } from './components/Auth/Login';
import { AdminUsers } from './components/Auth/AdminUsers';
import { ProtectedLayout } from './components/Auth/ProtectedLayout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<DayList />} />
            <Route path="/day/:dayId" element={<DayDetail />} />
            <Route path="/day/:dayId/topic/:topicId" element={<TopicDetail />} />
            <Route path="/exam-quiz" element={<ExamQuiz />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
