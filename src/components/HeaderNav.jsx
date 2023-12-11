
import  { useState } from 'react'
import { Link } from 'react-router-dom';
import { Avatar } from '@mantine/core';
import Cookies from 'js-cookie';



function HeaderNav () {

  let Links =[
    {name:"HOME",link:"/"},
    {name:"Edit",link:"/edit"},
    {name:"Create",link:"/create"},
    {name:"Show",link:"/show"},
    {name:"Login",link:"/login"},
  ];
  let [open,setOpen]=useState(false);
  return (
   <>
   
   <div className='  shadow-md w-full fixed top-0 left-0 border-b-2 border-b-indigo-600 z-[100]'>
    <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7 '>
    <Link to='/' className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800'>
     
      Logo
    </Link>
    
    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
    <ion-icon name={open ? 'close':'menu'}></ion-icon>
    </div>
  
 <Link to='/login' className=' right-[72px] md:right-[20px] shopIcon '>  <Avatar radius="xl" className='block m-auto' src={'userInfo? userInfo.image: img1'}/> <h3 className='text-[8px] font-bold'>{Cookies.get('nameLogin')?Cookies.get('nameLogin'):""}</h3> </Link>  
    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' :'top-[-490px] px-16'}`}>
      {
        Links.map((link)=>(
          <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
            <Link to={link.link} className='text-gray-800 hover:text-indigo-600 duration-500'>{link.name}</Link>
          </li>
        ))
      }
      
    
    </ul>
    </div>
  </div>
  </>
  )
}

export default HeaderNav