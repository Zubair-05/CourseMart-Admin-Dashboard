import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { courseState, loadingState } from '../store/course'

const Init = () => {
    const [init, setInit] = useRecoilState(courseState);
    const [loading, setLoading] = useRecoilState(loadingState);
    useEffect(() => {
        setLoading(true);
        const getCourses = async () => {
            try {
                const response = await fetch(`http://localhost:3000/admin/courses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                console.log(data);

                setLoading(false);
                setInit(data.courses);
            } catch (error) {
                console.log(error);
            }
        };
        getCourses();
    }, [])


    return (
        <div></div>
    )
}

export default Init