import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from '../../config'
import { useRecoilState } from "recoil";
import { courseState } from "../store/course";

function CreateCourse() {
  const [courses, setCourses] = useRecoilState(courseState);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: 1200,
    imageLink: "",
    isPublished: false,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to='/' />
  }

  const handleSubmit = async (isPublished) => {
    const url = `${BASE_URL}/admin/courses`;
    const requestData = { ...courseData, isPublished };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      setCourses((oldCart) => {
        return [...oldCart, data];
      });
      if(isPublished) navigate('/courses');
      else navigate('/saved-courses');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = () => {
    handleSubmit(true);
  };

  const handleSave = () => {
    handleSubmit(false);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      setCourseData({ ...courseData, imageLink: imageData });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-2 sm:mx-auto  my-9">
      <h1 className="text-4xl font-semibold text-center my-3 mb-6">Create A New Course</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={courseData.title}
            onChange={(e) =>
              setCourseData({ ...courseData, title: e.target.value })
            }
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="font-bold">
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={courseData.description}
            onChange={(e) =>
              setCourseData({ ...courseData, description: e.target.value })
            }
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
          />
        </div>

        <div>
          <label htmlFor="price" className="font-bold">
            Price:
          </label>
          <input
            type="text"
            id="price"
            value={courseData.price}
            onChange={(e) =>
              setCourseData({ ...courseData, price: e.target.value })
            }
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
          />
        </div>

        <div>
          <label htmlFor="image" className="font-bold">
            Image:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
          />
        </div>

        {courseData.imageLink && (
          <img
            src={courseData.imageLink}
            alt="Course"
            className="max-w-full"
          />
        )}

        <button
          onClick={handlePublish}
          className="bg-green-500 text-white py-2 px-4 mr-2 rounded hover:bg-green-600 transition-colors"
        >
          Publish
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 mx-2 rounded hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>

      <NavLink to="/courses" className="mt-4 block text-blue-500">
        Back to Courses
      </NavLink>
    </div>
  );
}

export default CreateCourse;




// useEffect(() => {
//   const f = async () => {
//     const response = await fetch(`${BASE_URL}/admin/courses`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(courseData),
//     });
//     console.log('courseData');
//     console.log(courseData);
//     const data = await response.json();
//     if (data) {
//       console.log(`inside create course ${token}`);
//     }
//     console.log(data);
//   }
//   if (courseData.isPublished) {
//     f();
//     setCourses((oldCart) => {
//       return [...oldCart, courseData];
//     });
//     navigate("/courses");
//   }
// }, [courseData.isPublished])


// const handlePublish = async () => {
//   setCourseData({ ...courseData, isPublished: true });
// };


// const handleSave = async () => {
//   // setCourseData({ ...courseData, isPublished: false });
//   const response = await fetch(`${BASE_URL}/admin/courses`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(courseData),
//   });
//   const data = await response.json();
//   if (data) {
//     console.log(`inside create course ${token}`);
//     setCourses((oldCart) => {
//       return [...oldCart, courseData];
//     });
//     navigate("/saved-courses");
//   }
//   console.log(data);
// };