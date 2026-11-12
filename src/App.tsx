import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { DocumentsPage } from './pages/DocumentsPage';
import { QuestionPage } from './pages/QuestionPage';

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="brand">PocketRAG</span>
        <nav className="nav">
          <NavLink to="/" end className={navClass}>
            Pergunta
          </NavLink>
          <NavLink to="/documents" className={navClass}>
            Documentos
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<QuestionPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function navClass({ isActive }: { isActive: boolean }): string {
  return isActive ? 'nav-link active' : 'nav-link';
}