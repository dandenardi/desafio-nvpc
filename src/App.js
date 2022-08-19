import { useEffect, useState } from 'react';
import api from './services/api';

import './App.css';
import axios from 'axios';

const ALL = '/repos';
const MEMBER = '/repos?type=member';
const OWNED_REPO = '/repos?type=owner';
const SEARCH = 'https://api.github.com/search/code?q=user:dandenardi+';
const PERSONAL = 'https://api.github.com/users/dandenardi';

function App() {
  const [personalData, setPersonalData] = useState([]);
  const [gitData, setGitData] = useState([]);
  const [option, setOption] = useState('all');
  const [order, setOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [gitSearchData, setGitSearchData] = useState([]);


  useEffect(() => {
    renderGitContent();

  }, [option, order]);

  useEffect(() => {
    getPersonalData();
  }, []);

  async function renderGitContent(){

    if(option === 'owned' && order === 'byName'){
      await api.get(OWNED_REPO+'&sort=name')
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else if(option === 'member' && order === 'byName'){
      await api.get(MEMBER+'&sort=name')
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else if(option === 'owned' && order === 'byDate'){
      await api.get(OWNED_REPO+'&sort=date')
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else if(option === 'member' && order === 'byDate'){
      await api.get(MEMBER+'&sort=date')
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else if(option === 'all' && order === 'byName'){
      await api.get(ALL+'?sort=name')
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else if(option === 'all' && order === 'byDate'){
      await api.get(ALL+'?sort=date')
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else if(option === 'owned' && order === ''){
      await api.get(OWNED_REPO)
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else if(option === 'member' && order === ''){
      await api.get(MEMBER)
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }else{
      await api.get(ALL)
      .then((response) => {
        setGitData(response.data);
      })
      .catch(function(error){
        console.error(error);
      })
      .finally(() => {
        console.log(gitData);
      })
    }
  }

  async function getPersonalData(){
    await axios.get(PERSONAL)
    .then((response) => {
      setPersonalData(response.data);
    })
    .catch(function(err) {
      console.error(err);
    })
  }

  function orderByName(){
    setOrder('byName');
  }

  function orderByDate(){
    setOrder('byDate');
  }

  async function handleSearch(){
    await api.get(SEARCH+searchTerm)
    .then((response) => {
      
      setGitSearchData(response.data.items);
    })
    .catch(function(error){
      console.error(error);
    })
    .finally(() => {
      console.log(gitData);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> Bem-vinda(o) ao meu site do GitHub</h1>
        <section className="personal-data">
          <img alt="imagem pessoal de dandenardi" src={personalData.avatar_url}/>
          <h5>Olá, meu nome é Daniel e eu sou o {personalData.login} no GitHub. 
            Aqui você encontra meus projetos hospedados por lá e pode fazer uma 
            busca para saber sobre algum aspecto mais específico. Abraço!
          </h5>
        </section>
        <section className="search-section">
          <label>Busque no meu Git</label>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Insira a palavra-chave"/>
          <button onClick={handleSearch}>Buscar</button>
        </section>
      </header>
      <main className="app-main">
        <section className="search-container">
          
          <table>
            <tr className={(gitSearchData.length === 0) ? "hidden" : "search-results"}>
              <th>Nome do arquivo</th>
              <th>Repositório onde se encontra</th>
              <th>URL do repositório</th>
            </tr>
            {(gitSearchData.length === 0)?<h2>Nenhum resultado.Tente uma busca...</h2>:gitSearchData.map((result, key) => {
              return (
                
                <tr>
                  <td>
                    {result.name}
                  </td>
                  <td>
                    {result.repository.name}
                  </td>
                  <td>
                    <a href={result.html_url} target="_blank" rel="noreferrer">{result.html_url}</a>
                  </td>
                </tr>
                
              )
            })}
          </table>
        </section>
        
        <h3>Talvez você esteja interessada(o) em: </h3>
        <select onChange={(e) => setOption(e.target.value)} className="git-filter">
          <option value='all'>Ver todos os repositórios</option>
          <option value='owned'>Ver apenas aqueles criados por mim</option>
          <option value='member'>Ou apenas os que participo</option>
        </select>
        <table className="git-content">
          <tr>
            <th className="tooltip">
              <button onClick={orderByName} className="order-btn">Nome do repositório</button>
              <span class="tooltiptext">Clique em mim para ordenar (por nome)</span>
            </th>
            <th>Descrição</th>
            <th>URL</th>
            <th className="tooltip">
              <button onClick={orderByDate} className="order-btn">Último commit em:</button>  
              <span className="tooltiptext">Clique em mim para ordenar (por data)</span>
                
            </th>
          </tr>
          
          
          {(gitData.length === 0)?<h1>Nenhum resultado para este critério...</h1>:gitData.map((repository, key) => {
                return (
                  <tbody>
                    <tr>
                      <td>
                        {repository.name}
                      </td>
                      <td>
                        {repository.description}
                      </td>
                      <td>
                        <a href={repository.html_url} target="_blank" rel="noreferrer">{repository.html_url}</a>
                      </td>
                      <td>
                        {repository.updated_at}
                      </td>
                    </tr>
                  </tbody>
                )
            })}
          
        </table>
      </main>
    </div>
  );
}

export default App;
