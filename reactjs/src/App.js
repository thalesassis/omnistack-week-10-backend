import React, { useEffect, useState } from 'react';
import api from './services/api';
import Person from './Components/Person/Person';
import './App.scss';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [result, setResult] = useState('');
  
  useEffect(() => {
    setUsers([]);
    async function loadUsers() {  
      const getUsers = await api.get('/users');
      setUsers(getUsers.data);
    }  
    loadUsers();
  },[]);

  async function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: username,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    }

    const storeUser = await api.put('/user', newUser);
    setResult(storeUser.data.result);

    if(storeUser.data.success) {
      setUsers([...users,storeUser.data.storedUser]);
    }

    setUsername('');
    setLatitude('');
    setLongitude('');
  }
    
  async function removeUser(id, result) {
    const removeUser = await api.delete('/user/'+id);
    setUsers(users.filter(user => user._id !== id));
    result(removeUser.data.result);
  } 

  return (
    <div id="app">
      <aside>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="">Github username:</label>
            <input required type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          
          <div className="input-block half">
            <label htmlFor="">Latitude:</label>
            <input required type="text" value={latitude} onChange={e => setLatitude(e.target.value)} />
          </div>
           
          <div className="input-block half fright">
            <label htmlFor="">Longitude:</label>
            <input required type="text" value={longitude} onChange={e => setLongitude(e.target.value)} />
          </div>

          <input type="submit" value="Send" />
          {result}
        </form>
      </aside>
      
      <main>
        <ul className="Persons">
          {users.map(user => (
            <Person key={user._id} user={user} remove={removeUser} result={setResult} />
          ))}        
        </ul>    
      </main>
    </div>
  ); 
}

export default App;