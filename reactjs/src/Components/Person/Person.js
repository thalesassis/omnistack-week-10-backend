import React from 'react';
import './Person.scss';

function Person(props) { 
    return (
        <li key="props.user._id" className="Person">
            {props.user._id} 
            <button onClick={() => props.remove(props.user._id, props.result) }>Delete</button>
            <div className='img'><img src={props.user.avatar_url} /></div>
            <h2>{props.user.username}</h2>
            <p>{props.user.bio == null? '(Sem bio)':props.user.bio}</p>
        </li>
    )
}

export default Person;