import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../config'
import { courseState, loadingState } from "../store/course";
import { useRecoilState, useRecoilValue } from "recoil";
import CourseSkeleton from '../utils/CourseSkeleton';
import Init from "../utils/Init";

function ShowCourses() {
  const [courses, setCourses] = useRecoilState(courseState);
  const [isLoading, setLoading] = useRecoilState(loadingState);
  const Navigate = useNavigate();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");



  useEffect(() => {
    if (!token) {
      <Navigate to="/" />;
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    const getCourses = async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/courses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log(data);

            setLoading(false);
            setCourses(data.courses);
        } catch (error) {
            console.log(error);
        }
    };
    getCourses();
}, [])
  if (isLoading) {
    return <CourseSkeleton />
  }
  // var publishedCourses = []; 

  const publishedCourses = courses.filter(course => course.isPublished)

  console.log('published courses are');
  console.log(publishedCourses);


  const handleCourseDelete = async (courseId) => {
    try {
      await fetch(`${BASE_URL}/admin/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="container mx-auto">
      {/* <Init /> */}
      <h1 className="text-3xl font-semibold text-center my-6">
        Knowledge is Power: Empower Others through Course Creation!
      </h1>

      <div className=" mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedCourses.length > 0 ? (
          publishedCourses.map((c) => (
            <Course
              key={c._id}
              courseId={c._id}
              title={c.title}
              price={c.price}
              image={c.imageLink}
              description={c.description}
              onCourseDelete={handleCourseDelete}
            />
          ))
        ) : (
          <h1 className="text-xl font-semibold text-center my-6">
            No Course Found
          </h1>
        )}
      </div>
    </div>
  );
}

function Course(props) {
  const navigate = useNavigate();

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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      props.onCourseDelete(props.courseId);
    }
  };

  return (
    <div className="border border-gray-300 rounded p-4 hover:bg-gray-100 transition-colors cursor-pointer">
      <h2 className="text-xl font-bold mb-2">{props.title}</h2>
      <p className="mb-2">{props.description}</p>
      <p className="mb-2">Price: ${props.price}</p>
      <div className="flex justify-center">
        <img
          src={props.image}
          alt="course image"
          className="max-w-full mb-2 flex justify-center"
          style={{ height: "200px" }}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mr-2"
        >
          Edit Course
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Delete Course
        </button>
      </div>
    </div>
  );
}

export default ShowCourses;
