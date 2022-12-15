import React, { useRef, useState, useEffect } from 'react';
import { debounce } from '../utils';

const albumsMod = {};
const usersByAlbumId = {};

const getAlbomTitle = (albums, albumId) => {
    if (albumsMod[albumId]) return albumsMod[albumId].title;

    const album = albums.find(alb => alb.id === albumId);

    albumsMod[albumId] = {
        title: album?.title || 'no title',
        userId: album?.userId || 0,
    };
    return albumsMod[albumId].title;
};

const getUserName = (albumId, users) => {
    if (usersByAlbumId[albumId]) return usersByAlbumId[albumId].name;

    const userId = albumsMod[albumId].userId;

    const findedUser = users.find(user => user.id === userId);

    usersByAlbumId[albumId] = findedUser;
    return usersByAlbumId[albumId].name;
};

let elHeight = null;
const minEls = 10;

const PhotosTable = ({photos, albums, users, updateCurrentUser, updateModalState}) => {
    const [lazyPhotos, setLazyPhotos] = useState([]);

    const handleClick = (e) => {
        const albumId = e.target.getAttribute('data-albumid');

        if (!albumId || !usersByAlbumId[albumId]) return;

        updateCurrentUser(usersByAlbumId[albumId])
        updateModalState(true);
    };

    useEffect(() => {
        const res = [];

        for (let i = 0; i < minEls; i++) {
            res[i] = photos[i];
        }

        setLazyPhotos(res);
    }, []);

    const handleScroll = (e) => {
        if (elHeight === null) elHeight = e.target.scrollHeight - 547;

        const cf = Number(e.target.scrollTop) / elHeight;
        console.log(cf);

        if (cf <= 0.65) return;

        const res = [];

        for (let i = 0; i < minEls; i++) { // не успел)
            res[i] = photos[i];
        }
        setLazyPhotos(res);
    };

    const debounced = debounce(handleScroll, 200);

    return (
        <table>
        <tbody
            onClick={handleClick}
            onScroll={debounced}
            style={{maxHeight: '100vh', overflow: 'scroll', display: 'block'}}
        >
            <tr>
                <th>id</th>
                <th>thumbnailUrl</th>
                <th>title</th>
                <th>album title</th>
                <th>user</th>
                <th>view user</th>
            </tr>
                {
                    lazyPhotos.map((ph) => (
                        <tr key={ph.id}>
                            <td>{ph.id}</td>
                            <td><img src={ph.thumbnailUrl} alt="thumbnail url" /></td>
                            <td>{ph.title}</td>
                            <td>{getAlbomTitle(albums, ph.albumId)}</td>
                            <td>{getUserName(ph.albumId, users)}</td>
                            <td>
                                <button data-albumid={ph.albumId} >click</button>
                            </td>
                        </tr>
                    ))
                }
        </tbody>
    </table>
    );
};

export default React.memo(PhotosTable);