import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import UpdateCourse from './components/UpdateCourse';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import SavedCourses from './components/SavedCourses';
import Init from './utils/Init';

function App() {
    return (
        <Router>
            {/* <Init/> */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path="/update/:id" element={<UpdateCourse />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/saved-courses" element={<SavedCourses />} />
            </Routes>
            <Footer /> 
        </Router>
    );
}

export default App;