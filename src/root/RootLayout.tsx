import BottomBar from "@/components/ui/shared/BottomBar"
import SideBar from "@/components/ui/shared/SideBar"
import Topbar from "@/components/ui/shared/Topbar"
import { Outlet } from "react-router-dom"
const Rootlayout = () => {
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
