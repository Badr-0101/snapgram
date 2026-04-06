import { useState,useEffect } from "react"
import BottomBar from "@/components/ui/shared/BottomBar"
import SideBar from "@/components/ui/shared/SideBar"
import Topbar from "@/components/ui/shared/Topbar"
import { Outlet } from "react-router-dom"
import Loader from "@/components/ui/shared/Loader"
const Rootlayout = () => {
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    const checkAuth = async () => {
      try {
     
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
    
  }, [])
  if(isLoading){
    return (
      <div className="flex-center w-screen h-screen">
        <Loader />
      </div>
    )
  }
  return (
    <div className="w-full sm:flex">
      <Topbar />
      <SideBar />
      <section className="md:pt-10 flex flex-1">
          <Outlet  />
      </section>
    
      <BottomBar/>
    </div>
  )
}

export default Rootlayout
