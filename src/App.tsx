import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { DayList } from './components/Day/DayList';
import { DayDetail } from './components/Day/DayDetail';
import { TopicDetail } from './components/Topic/TopicDetail';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <ProgressProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
          <div className="flex">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <main className="flex-1 p-3 sm:p-6 overflow-y-auto lg:ml-0 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)]">
              <Routes>
                <Route path="/" element={<DayList />} />
                <Route path="/day/:dayId" element={<DayDetail />} />
                <Route path="/day/:dayId/topic/:topicId" element={<TopicDetail />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
