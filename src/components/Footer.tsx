
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-300 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="mb-6">
            <img src="/lovable-uploads/7a6c6eb7-db9f-4a59-a898-335b3d25031e.png" alt="ProZ.com Logo" className="h-10 mb-4" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Contact us</button>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3">ProZ.com Headquarters</h3>
            <p>2509 James Street</p>
            <p>P.O. Box 323</p>
            <p>Syracuse, NY 13206-9277</p>
            <p>USA</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3">ProZ.com Argentina</h3>
            <p>Calle 14 nro. 622 1/2 entre 44 y 45</p>
            <p>La Plata (B1900AND), Buenos Aires</p>
            <p>Argentina</p>
            <p>+54-221-425-1266</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-bold mb-3">ProZ.com Ukraine</h3>
            <p>6 Karazina St.</p>
            <p>Kharkiv, 61002</p>
            <p>Ukraine</p>
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-between text-gray-600">
          <div className="flex gap-6 mb-4">
            <Link to="/">Terminología</Link>
            <Link to="/">Trabajos y directorios</Link>
            <Link to="/">Actividades para miembros</Link>
            <Link to="/">Formación</Link>
            <Link to="/">Herramientas</Link>
          </div>
          
          <div className="flex gap-4 mb-4">
            <Link to="/">Acerca de ProZ.com</Link>
            <Link to="/">Información básica sobre ProZ.com</Link>
            <Link to="/">Publicidad</Link>
            <Link to="/">Asistencia</Link>
            <Link to="/">Preguntas frecuentes</Link>
            <Link to="/">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
