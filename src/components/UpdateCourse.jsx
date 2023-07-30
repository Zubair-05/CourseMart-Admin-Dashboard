import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../config'

const UpdateCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState({
    title: location.state.title,
    description: location.state.description,
    price: location.state.price,
    imageLink: location.state.imageLink,
    id: location.state.courseId,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      setCourse({ ...course, imageLink: imageData });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(
      `${BASE_URL}/admin/courses/${course.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(course),
      }
    );
    const data = await response.json();
    if (data) {
      console.log(`inside update course ${data}`);
      navigate('/courses');
    }
    console.log(data);
  };

  return (
    <div className="container mx-auto mb-10">
      <h1 className="text-3xl font-bold my-6">Update Course Page</h1>
      <div>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Id:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={course.id}
            onChange={(e) => setCourse({ ...course, id: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={course.description}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price:
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={course.price}
            onChange={(e) => setCourse({ ...course, price: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">
            Image:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="mb-2"
          />
          {course.imageLink && (
            <img
              src={course.imageLink}
              alt="Course"
              className="max-w-full h-auto"
            />
          )}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Update Course
        </button>
      </div>
    </div>
  );
};

export default UpdateCourse;
