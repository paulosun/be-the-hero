import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'
import { useState } from 'react';

function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongId   = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,
            {headers : {Authorization: ongId,}
        });
        } catch (error) {
            alert("Erro ao tentar deletar caso, tente novamente");
        }

        setIncidents(incidents.filter(incident => incident.id !== id))
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    useEffect(() => {
        api.get('profile', {
            headers : {Authorization: ongId,} 
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button type="button">
                            <FiTrash2 onClick={() => handleDeleteIncident(incident.id)} size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile;