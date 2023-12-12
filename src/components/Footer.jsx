

import Item from './Item';

export const PRODUCTS = [
  { name: "Drag And Drop", link: "#" },
  { name: "Visual Studio X", link: "#" },
  { name: "Easy Content", link: "#" },
];
export const RESOURCES = [
  { name: "Industries and tools", link: "#" },
  { name: "Use cases", link: "#" },
  { name: "Blog", link: "#" },
  { name: "Online evenet", link: "#" },
  { name: "Nostrud exercitation", link: "#" },
];
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
  
    
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 items-start">
    <div className=" text-white font-bold text-2xl cursor-pointer flex items-center font-[Poppins] ">
      <span className='text-3xl text-indigo-600 mr-1 pt-2'>
      
     
      </span>
      LOGO
    </div>
      <Item Links={PRODUCTS} title="PRODUCTS" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={PRODUCTS} title="PRODUCTS" />
     
    </div>
  </footer>
  )
}

export default Footer