import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {LiaSaveSolid} from 'react-icons/lia'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {IoIosCreate} from 'react-icons/io'
import {PiStudentDuotone} from 'react-icons/pi'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function TemporaryDrawer() {
    const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        
      <ListItem  disablePadding>
            <ListItemButton onClick={() => {
                navigate('/')
            }}>
              <ListItemIcon>
                <LibraryBooksIcon/>
              </ListItemIcon>
              <ListItemText primary={'All Courses'} />
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton onClick={() => {
                navigate('/create')
            }}>
              <ListItemIcon>
                <IoIosCreate size={25}/>
              </ListItemIcon>
              <ListItemText primary={'Create Course'} />
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton onClick={() => {
                navigate('/saved-courses')
            }}>
              <ListItemIcon>
                <LiaSaveSolid size={25}/>
              </ListItemIcon>
              <ListItemText primary={'Saved Course'} />
            </ListItemButton>
          </ListItem>
        
      </List>
      <Divider />
      <List>
       
          <ListItem  disablePadding>
            <ListItemButton onClick={() => {
                window.open(`https://course-mart-user-dashboard-zubair-05.vercel.app/`, '_blank');  
            }}>
              <ListItemIcon>
                <PiStudentDuotone size={30}/>
              </ListItemIcon>
              <ListItemText primary={'Student page'} />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => {
                navigate('/profile')
            }}>
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton onClick={() => {
                localStorage.removeItem('token');
                navigate('/');
            }}>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItemButton>
          </ListItem>
     
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} >
            <FaBars size={30} style={{ fill: 'white' }}/>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}