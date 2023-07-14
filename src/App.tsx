
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SystemForm from "./components/SystemForm";
import DocumentForm from "./components/DocumentForm";
import Header from "./components/Header";
import './App.css';
import Footer from "./components/Footer.tsx";

// Define o componente principal da aplicação
function App() {
    return (
        <div>
            <Header />
            {/* Utiliza o componente Router para possibilitar a navegação entre as páginas */}
            <Router>
                {/* Adiciona links para navegar entre as páginas */}
                <nav>
                    <Link to="/system">Sistema</Link> |
                    <Link to="/document">Documento</Link>
                </nav>
                {/* Define as rotas para cada página */}
                <Routes>
                    <Route path="/system" element={<SystemForm />} />
                    <Route path="/document" element={<DocumentForm />} />
                </Routes>
            </Router>
            <Footer/>
        </div>
    );
}
export default App;
