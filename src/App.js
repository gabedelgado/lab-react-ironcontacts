// import logo from './logo.svg';
import './App.css';
import allcontacts from "./contacts.json"
import trophyImg from "./assets/images/trophy.png"
import React from "react"

function App() {
  const [contacts, setContacts] = React.useState(allcontacts.slice(0,5))
  
  let addRandomContact = () => {
    let contactToAdd = allcontacts[Math.floor(Math.random() * allcontacts.length)]
    while(contacts.includes(contactToAdd)){
      contactToAdd = allcontacts[Math.floor(Math.random() * allcontacts.length)]
    }
    setContacts(contacts.concat(contactToAdd))
  }
  
  let sortByPopularity = () => {
      setContacts([...contacts].sort((a,b) => {
        return b.popularity - a.popularity
      }))
  }
  
  let sortByName = () => {
    setContacts([...contacts].sort((a,b) => {
      return a.name.localeCompare(b.name)
    }))
}

  let removeContact = (toRemoveID) => {
    setContacts([...contacts].filter(contact => {
      return contact.id !== toRemoveID
    }))
  }

  return (
    
    <div className="App">
    <h1>IronContacts</h1>
      <div className='contactBookDiv'>
        <div className='actionButtonsDiv'>
          <button onClick={addRandomContact} className="btn btn-dark">Add Random Contact</button>
          <button onClick={sortByPopularity} className="btn btn-dark">Sort by Popularity</button>
          <button onClick={sortByName} className="btn btn-dark">Sort by Name</button>
        </div>
        <div className='contactTableDiv'>
          <table>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Won Oscar</th>
                <th>Won Emmy</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                return(
                  <tr key={contact.id}>
                    <td><img style={{width: 100}} src={contact.pictureUrl} alt="contact-img" /></td>
                    <td><p>{contact.name}</p></td>
                    <td><p>{contact.popularity.toFixed(2)}</p></td>
                    <td>{contact.wonOscar ? <img src={trophyImg} style={{width: 30}} alt="trophy-img"/> : null}</td>
                    <td>{contact.wonEmmy ? <img src={trophyImg} style={{width: 30}} alt="trophy-img"/> : null}</td>
                    <td><button className="btn btn-danger" onClick={() => {removeContact(contact.id)}}>Delete Contact</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
