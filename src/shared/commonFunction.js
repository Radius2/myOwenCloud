export const formatTitleOfValue = (value) => {
    return (typeof value === 'string') ?
        value.replace('&#176;', '°')
        : 'нет данных';
};

export const getLastUpdate = lastUpdate => {
    const dateLastUpdate = new Date(+lastUpdate * 1000);
    const nowDate = new Date();
    const lastUpdateSec = Math.trunc((nowDate - dateLastUpdate) / 1000);
    if (lastUpdateSec < 60) {
        return lastUpdateSec + ' сек';
    }
    const lastUpdateMin = Math.trunc(lastUpdateSec / 60);
    if (lastUpdateMin < 60) {
        return lastUpdateMin + ' мин ' + (lastUpdateSec % 60) + ' сек';
    }
    const lastUpdateHour = Math.trunc(lastUpdateMin / 60);
    if (lastUpdateHour < 60) {
        return lastUpdateHour + ' час ' + (lastUpdateMin % 60) + ' мин';
    }
    const lastUpdateDay = Math.trunc(lastUpdateHour / 24);
    return lastUpdateDay + ' д ' + (lastUpdateHour % 24) + ' час';
};

export const saveLogin = (login, password) => {
    localStorage.setItem('login', login);
    localStorage.setItem('password', password);
    localStorage.setItem('firebaseLogin', login.replace(/[@.]/g, '_'));
};

export const deleteLogin = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('firebaseLogin');
};

export const formatDate = (date) => {
    const formatDate = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()].join('-');
    const formatHour = date.toLocaleTimeString('en-GB');
    return `${formatDate} ${formatHour}`;
};