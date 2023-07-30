import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import UpdateCourse from './components/UpdateCourse';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    // const token = localStorage.getItem('token');
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/update/:id" element={<UpdateCourse />} />
            </Routes>
            <Footer /> 
        </Router>
    );
}

export default App;