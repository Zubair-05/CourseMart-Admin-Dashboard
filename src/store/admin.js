import {atom, selector} from 'recoil';

export const adminState = atom({
    key: 'adminState',
    default: {
        id: '',
        name: '',
        email: '',
        password: '',
        role: ''
    },
});

export const adminSelector = selector({
    key: 'adminSelector',
    get: ({get}) => {
        const admin = get(adminState);
        return admin;
    },
    set: ({set}, newValue) => {
        set(adminState, newValue);
    },
});

