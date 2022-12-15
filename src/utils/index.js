export const searchPhotoById = (photos, id) => {
    const filtered = photos.filter(ph => ph.id === Number(id));

    return filtered;
};

export const searchPhotoByTitle = (photos, title) => {
    const filtered = photos.filter(ph => ph.title.includes(title));

    return filtered;
};

export const debounce = (cb, timeout) => {
    let timeoutId = null;

    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => cb(...args), timeout);
    };
};