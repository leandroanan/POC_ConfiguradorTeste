import React, {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SystemPage from './pages/SystemPage';
import DocumentPage from './pages/DocumentPage';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer.tsx';
import { LanguageContext } from './contexts/LanguageContext';
import { useAppContext } from './contexts/AppContext';

function App() {
    const { editing } = useAppContext();
    const { systemLink, documentLink } = useContext(LanguageContext);

    return (
        <div>
            <Header />
            <Router>
                {!editing && (
                    <nav>
                        <Link to="/system" className="link">{systemLink}</Link>
                        <Link to="/document" className="link">{documentLink}</Link>
                    </nav>
                )}
                <Routes>
                    <Route path="/system" element={<SystemPage />} />
                    <Route path="/document" element={<DocumentPage />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
