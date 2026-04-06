
import {  NavLink } from 'react-router-dom'

import { bottomBarLinks } from '@/constants/index'

const BottomBar = () => {
  return (
    <nav className=' hidden max-sm:block fixed bottom-0 w-full'>

                <ul className='flex flex-row justify-between px-5  '>
                  {bottomBarLinks.map((link,index) => {
                    return (
                      
                      <NavLink to={link.route} key={index}>
                        {({isActive}) => (
                          <li className={`flex flex-col items-center gap-2.5 p-2.5 group rounded-[10px]  hover:bg-primary-500   ${isActive ? "bg-primary-500" : ""}`}>
                          <img src={link.imgURL} className={`group-hover:invert-white ${isActive?"invert-white":""}`} width={16} height={16} />
                          <p className='tiny-medium  text-light-2'>{link.label}</p>
                        </li>
                  )}
                        
                        </NavLink>
                      
                      )
                })}
                </ul>

   </nav>
  )
}

export default BottomBar
