import {atom, selector} from 'recoil';

export const courseState = atom({
    key: 'courseState',
    default: []
});

export const initCourse = atom({
    key: 'initCourse',
    default: []
})

export const loadingState = atom({
    key: 'loadingState',
    default: false
})