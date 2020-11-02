import React from 'react';
import {Link} from 'react-router-dom';

import './Room.css';

const Room = () => {
    const [roomId, setRoomId] = React.useState('');

    const handleRoomIdChange = (event)=>{
        setRoomId(event.target.value);
    };

    return (<div className="auth-container">
        <input
            type="text"
            placeholder="Room"
            value={roomId}
            onChange={handleRoomIdChange}
            className="text-input-field"
        />
        <Link to={`/${roomId}`} className="enter-room-button">
            Join room
        </Link>
    </div>)
}

export default Room;