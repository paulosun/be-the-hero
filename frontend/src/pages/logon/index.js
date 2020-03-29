import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import heroesImages from '../../assets/heroes.png'
import {FiLogIn} from 'react-icons/fi'
import api from '../../services/api'

function Logon() {
  const history = useHistory();
  const [id, setId] = useState('');

  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', {id});

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');

    } catch (error) {
      alert("Falha no login, tente novamente mais tarde");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"></img>
        <form onSubmit={handleLogin}>
          <h1>Faça o seu Logon</h1>
          <input 
            placeholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          ></input>
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImages} alt="heroes"></img>
    </div>
  );
}

export default Logon;
