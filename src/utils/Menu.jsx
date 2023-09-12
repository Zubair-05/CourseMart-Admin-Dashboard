import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import img from '../assets/images/profileImage.jpeg'
import { useNavigate } from 'react-router-dom';
import { courseState } from '../store/course';
import { useRecoilState } from 'recoil';

export default function BasicMenu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [courses, setCourses] = useRecoilState(courseState);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar
                    alt="Remy Sharp"
                    src={img}
                />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    navigate('/profile');
                }}>Profile</MenuItem>
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    navigate('/courses');
                }}>All Courses</MenuItem>
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    navigate('/create');
                }}>Create Courses</MenuItem>
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    navigate('/saved-courses');
                }}>Saved Courses</MenuItem>

                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    window.open(`https://course-mart-user-dashboard-zubair-05.vercel.app/`, '_blank');  
                }}>Student page</MenuItem>
                <MenuItem onClick={() => {
                    setAnchorEl(null);
                    localStorage.removeItem('token');
                    setCourses([]);
                    navigate('/');
                }}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
