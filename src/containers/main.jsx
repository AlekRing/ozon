import React, { useMemo, useState } from 'react';
import logo from '../assets/logo.svg';
import Modal from '../components/modal';
import PthotosTable from '../components/pthotosTable';
import Search from '../components/search';
import { debounce, searchPhotoById, searchPhotoByTitle } from '../utils';

const Main = ({photos, albums, users}) => {
    const [filteredPhotos, setFilteredPhotos] = useState(photos);
    const [currentUser, setCurrentUsers] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const memoizedPhotos = useMemo(() => filteredPhotos, [filteredPhotos]);
    const memoizedAlbums = useMemo(() => albums, [albums]);
    const memoizedUsers = useMemo(() => users, [users]);

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value) return setFilteredPhotos(photos);

        if (isNaN(Number(value))) {
            const filtered = searchPhotoByTitle(photos, value);

            setFilteredPhotos(filtered);
            return;
        }

        const filtered = searchPhotoById(photos, value);

        setFilteredPhotos(filtered);
    };

    const debounced = debounce(handleChange, 800);

    const handleCLose = () => setIsModalOpen(false);

    return (
        <div>
            <img src={logo} alt="logo" width='60' height='30' />
            <Search handleChange={debounced} />
            <Modal
                handleClose={handleCLose}
                isOpen={isModalOpen}
                phone={currentUser?.phone}
                username={currentUser?.username}
                email={currentUser?.email}
                companyName={currentUser?.company?.name}
            />
            <PthotosTable
                photos={memoizedPhotos}
                updateCurrentUser={setCurrentUsers}
                updateModalState={setIsModalOpen}
                users={memoizedUsers}
                albums={memoizedAlbums}
            />
        </div>
    );
};

export default Main;