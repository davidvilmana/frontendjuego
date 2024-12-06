import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import tituloImg from '../assets/logo.png';
import ComoJugar from '../pages/ComoJugar';

const Botones = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className="menu flex flex-col items-center justify-center min-h-screen ">
            <img src={tituloImg} className="title w-1/3 mb-6" />
            <Link to="/login" className="btn start bg-blue-700 text-white px-8 py-3 rounded-lg mb-4 text-lg hover:bg-blue-800 transition">Comenzar</Link>
            <button onClick={toggleModal} className="btn start bg-blue-700 text-white px-8 py-3 rounded-lg mb-4 text-lg hover:bg-blue-800 transition">Cómo jugar</button>
            <a href="https://www.doctums.com/" className="btn start  text-white px-8 py-3  mb-4 text-lg " >Visita Doctums</a>
            {isModalOpen && <ComoJugar onClose={toggleModal} />}
        </div>
    );
};

export default Botones;
