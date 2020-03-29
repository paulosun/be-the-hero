import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './style.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'

function NewIncident(){
    const ongId   = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history =  useHistory();

    async function handleCreateNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        
        try
        {
            await api.post('incidents', data, {headers : {Authorization: ongId}},);
            alert("Seu caso foi criado com sucesso!");
            history.push('/profile');
        }
        catch(err)
        {
            alert("Erro no cadastro do seu novo caso, tente novamente mais tarde");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"></img>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleCreateNewIncident}>
                    <input
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default NewIncident;