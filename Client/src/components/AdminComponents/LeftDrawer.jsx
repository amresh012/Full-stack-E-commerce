import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../reusablesUI/Logo"
import {  Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 300;

const links = 
[
  {
    id:0,
    label:"Dashboard",
    route:"/admin",
    icon:"/public/dashboard.png"
  },
  {
    id:1,
    label:"Users",
    route:"/admin/users",
    icon:"/public/group.png"
  },
  {
    id:0,
    label:"Orders",
    route:"/admin/orders",
    icon:"/public/box.png"
  },
  {
    id:0,
    label:"Contact US",
    route:"/admin/contactus",
    icon:"/public/group.png"
  },
  {
    id:0,
    label:"Products",
    icon:"/public/box.png",
    submenu:true,
    sublink:[
      {
        label:"List Products",
        route:"/admin/product-list",
        icon:"/public/box.png"
      },
      {
        label:"Add Products",
        route:"/admin/products",
        icon:"/public/box.png"
      },
      {
        label:"Bulk Add",
        route:"/admin/bulk-product",
        icon:"/public/box.png"
      },
      {
        label:"Add Image",
        route:"/admin/bulk-images",
        icon:"/public/box.png"
      }
    ]
  },
  {
    label:"Website",
    icon:"/public/web.png",
    submenu:true,
    sublink:[{
         label:"Home Page",
         route:"/admin/website",
         icon:"/public/web.png"
    }]
  }, 
  {
    label:"Coupon",
    icon:"/public/coupon.png",
    submenu:true,
    sublink:[
      {
        label:"List Coupon",
        route:"/admin/coupon-list",
        icon:"/public/coupon.png"
      },
      {
        label:"Add Coupon",
        route:"/admin/coupon",
        icon:"/public/coupon.png"
      }
    ]
  }
]

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [visible , setVisible] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const habdleSubmenu = () =>{
    setVisible(!visible)
  }


  return (
    <Box sx={{ display: 'flex' , justifyContent:"flex-start"}}>
      <AppBar position="fixed" open={open} sx={{bgcolor:"white" , boxShadow:"none"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            // edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }),bgcolor:"#1565C0" }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex justify-between w-full items-center">
            <Logo/>
            <Button variant="contained">LogOut</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
       <div className="">
        {
          links.map((item)=>(
            <div className="px-2 flex flex-col  py-2" key={item.label}>
              <Link to={item.route} className='flex gap-2 p-2 items-center hover:bg-zinc-300'>
              <div className="">
              <img src={item.icon} alt={item.label} className='h-6' />
              </div>
               <div className="flex  p-2 w-full">
               <li className="list-none text-base font-bold">
                {item.submenu?
                <div className="flex" onClick={habdleSubmenu}>
                  <p>{item.label}</p>
                  <ExpandMoreIcon/>
                </div>
                :
                item.label}
                </li>
               </div>
              </Link>
              {
                item.submenu && visible && item.sublink?.map((link)=>(
                 <ul  key={link.label} className="flex  gap-2 justify-start hover:bg-blue-500 hover:text-white font-medium hover:underline-none items-start pl-12 ">
                    <Link  to={link.route} key={link.label} className='flex items-center gap-2 p-2'>
                    <div className="bg-zinc-200 p-2 rounded-full">
                    <img src={item.icon} alt={item.label} className='h-6' />
                    </div>
                  <li className="list-none text-base ">{link.label}</li>
                  </Link>
                 </ul>
                ))
              }
            </div>  
          ))
          
        }
       </div>
       
       
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
        <Outlet/>
      </Main>
    </Box>
  );
}