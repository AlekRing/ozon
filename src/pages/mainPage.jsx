import React, { useEffect, useState } from 'react';
import Main from '../containers/main';

const MainPage = () => {
    const [photos, setPhotos] = useState([]);
    const [alboms, setAlboms] = useState([]);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const getPhotos = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            const data = await response.json();

            console.log(data);
            setPhotos(data);
        };

        const getAlboms = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/albums');
            const data = await response.json();

            console.log(data);
            setAlboms(data);
        };

        const getUsers = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();

            console.warn('users', data);
            setUsers(data);
        };

        getPhotos();
        getAlboms();
        getUsers();
    }, []);

    return photos.length ? <Main photos={photos} albums={alboms} users={users} /> : <></>;
};

export default MainPage;