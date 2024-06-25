import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { IoMdAdd } from "react-icons/io";

export function NavMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const[user]=useAuthState(auth);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
      
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        
      </Typography>


      <Typography as="div" className="mr-4 cursor-pointer py-1.5 font-medium">
              <Link to="/add-cycle">
                <div className="text-2xl">
                     <IoMdAdd />
                </div>
              </Link>
              
        </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        {
          user && user.email ? (
            <Menu>
              <MenuHandler>
              <IconButton>
                 <FaUser className="text-xl text-white"/>
              </IconButton>
          </MenuHandler>
                <MenuList>
                <Link to="/profile/"> <MenuItem>Profile</MenuItem></Link>
                <Link to="/dashboard/"> <MenuItem>Dashboard</MenuItem></Link>
                <MenuItem onClick={()=>signOut(auth)}>Logout</MenuItem>
            </MenuList>
          </Menu>
          ) : (
            <Link to="/login">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Login</span>
              </Button>
           </Link>

          )}
      </Typography>


    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as="div" className="mr-4 cursor-pointer py-1.5 font-medium">
          <Link to="/">Cy-Rent</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="">
            <Link to="/login">
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                className="w-full block"
              >
                <span>Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
