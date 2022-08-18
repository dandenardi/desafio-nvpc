import { useEffect, useState } from 'react';
import api from './services/api';

import './App.css';

const ALL = '/repos';
const MEMBER = '/repos?type=member';
const OWNED_REPO = '/repos?type=owner';
const SEARCH = 'https://api.github.com/search/code?q=user:dandenardi+';

function App() {

  const [gitData, setGitData] = useState([]);
  const [option, setOption] = useState('all');
  const [order, setOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [gitSearchData, setGitSearchData] = useState([]);


  useEffect(() => {
    renderGitContent();

  }, [option, order]);


  async function renderGitContent(){

    console.log(option);
    console.log(order);
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
        <h1> Bem-vinda(o) ao Site</h1>
        <section>
          <label>Busque no meu Git</label>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Insira a palavra-chave"/>
          <button onClick={handleSearch}>Buscar</button>
        </section>
      </header>
      <main className="app-main">
        <section className="search-container">
          <table>
            <tr>
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
                    {result.git_url}
                  </td>
                </tr>
                
              )
            })}
          </table>
        </section>
        
        <h3>Talvez você esteja interessada(o) em: </h3>
        <select onChange={(e) => setOption(e.target.value)}>
          <option value='all'>Ver todos os repositórios</option>
          <option value='owned'>Ver apenas aqueles criados por mim</option>
          <option value='member'>Ou apenas os que participo</option>
        </select>
        <table className="git-content">
          <tr>
            <button onClick={orderByName}><th>Nome do repositório</th></button>
            <th>Descrição</th>
            <th>URL</th>
            <button onClick={orderByDate}><th>Último commit em:</th></button>
          </tr>
          <tbody>
          
          {(gitData.length === 0)?<h1>Nenhum resultado para este critério...</h1>:gitData.map((repository, key) => {
                return (
                  
                  <tr>
                    <td>
                      {repository.name}
                    </td>
                    <td>
                      {repository.description}
                    </td>
                    <td>
                      {repository.git_url}
                    </td>
                    <td>
                      {repository.updated_at}
                    </td>
                  </tr>
                  
                )
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
