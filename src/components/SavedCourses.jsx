import React, { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { courseState, loadingState } from '../store/course'
import { useNavigate } from 'react-router-dom'
// import {BASE_URL}
import { BASE_URL } from './../../config';
import SavedCoursesSkeleton from '../utils/SavedCoursesSkelton';

const SavedCourses = () => {
    const courses = useRecoilValue(courseState)
    const isLoading = useRecoilValue(loadingState)
    var courseToBePublished = courses.filter(course => course.isPublished === false)
    console.log('courseToBePublished');
    console.log(courseToBePublished);

    if (isLoading) {
        return <SavedCoursesSkeleton />
    }



    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">Cart</h1>
                <div className="flex flex-col">
                    {courseToBePublished.length > 0 ? (
                        courseToBePublished.map((c) => (
                            <Course
                                key={c._id}
                                courseId={c._id}
                                title={c.title}
                                price={c.price}
                                image={c.imageLink}
                                description={c.description}
                            />
                        ))
                    ) : (
                        <p>No courses found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SavedCourses


export const Course = (props) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const setCourses = useSetRecoilState(courseState);
    const [courseData, setCourseData] = useState({
        title: props.title,
        description: props.description,
        price: props.price,
        imageLink: props.image,
        isPublished: false,
    });

    const handlePublish = async () => {
        const updatedCourseData = {
            ...courseData,
            isPublished: true,
        };

        try {
            const response = await fetch(`${BASE_URL}/admin/courses/${props.courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedCourseData),
            });

            const data = await response.json();
            console.log(data);

            // Update the Recoil state for the course's isPublished status
            setCourses((oldCourses) => {
                return oldCourses.map((c) => {
                    if (c._id === props.courseId) {
                        return {
                            ...c,
                            isPublished: true,
                        };
                    }
                    return c;
                });
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemove = async () => {
        const response = await fetch(`${BASE_URL}/admin/courses/${props.courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        console.log(data);
        setCourses((oldCart) => {
            return oldCart.filter((c) => c._id !== props.courseId);
        });
    };

    const handleUpdate = () => {
        navigate(`/update/${props.courseId}`, {
            state: {
                title: props.title,
                description: props.description,
                price: props.price,
                imageLink: props.image,
                courseId: props.courseId,
            },
        });
    };

    return (

        <div className="border border-gray-300 rounded p-4 hover:bg-gray-100 transition-colors cursor-pointer ">

            
            <div className="flex sm:justify-between flex-col sm:flex-row">
                {/* Course Details */}
                <div className="md:mr-4">
                    <h2 className="text-xl font-bold mb-2">{props.title}</h2>
                    {/* <p className="mb-2">{props.description}</p> */}
                    <p className="mb-2">Price: ${props.price}</p>
                </div>

                {/* Image */}
                <div className="flex justify-center sm:justify-end mb-3 md:mt-0">
                    <img
                        src={props.image}
                        alt="course image"
                        className="w-44 h-auto"
                        style={{ maxHeight: '100px' }}
                    />
                </div>
            </div>


            <div className="flex ">
                <button
                    onClick={handlePublish}
                    className="bg-blue-500 text-white py-2 px-4 mt-3 rounded hover:bg-blue-600 transition-colors mr-2"
                >
                    Publish
                </button>
                <button
                    onClick={handleUpdate}
                    className="bg-yellow-500 text-white py-2 px-4 mt-3 rounded hover:bg-yellow-600 transition-colors mr-2"
                >
                    Edit
                </button>
                <button
                    onClick={handleRemove}
                    className="bg-red-500 text-white py-2 px-4 mt-3 rounded hover:bg-red-600 transition-colors mr-2"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
