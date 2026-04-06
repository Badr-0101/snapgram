import { Routes, Route } from "react-router-dom"
import { lazy, Suspense  } from "react"
import Loader from "@/components/ui/shared/Loader"
//Authpage
import AuthLayout from "./auth/AuthLayout"
import SignInForm from "./auth/form/SignInForm"
import SignUpFrom from "./auth/form/signUpForm/SignUpFrom"
//Rootpage
import { RootLayout } from "./root/page/index"
const Home = lazy(() => import("./root/page/Home"))
const Explore = lazy(() => import("./root/page/Explore"))
const PostPopUp = lazy(() => import("./components/ui/shared/PostPopUp"))
const Saved = lazy(() => import("./root/page/Saved"))
const AllUsers = lazy(() => import("./root/page/AllUsers"))
const CreatePost = lazy(() => import("./root/page/CreatePost"))
const EditPost = lazy(() => import("./root/page/EditPost"))
const UserProfile = lazy(() => import("./root/page/UserProfile"))

import { Toaster } from "@/components/ui/sonner"


function App() {
 
  return (
    <main>
      <Routes>
        {/* public Route */}
        <Route element={ <Suspense fallback={<Loader/>}><AuthLayout /></Suspense>}>
              <Route path="/signIn" element={<Suspense fallback={<Loader/>}><SignInForm /></Suspense>} />
              <Route path="/signup" element={<Suspense fallback={<Loader/>}><SignUpFrom /></Suspense>} />
        </Route>

        {/* privet Route */}
        <Route element={<Suspense fallback={<Loader/>}><RootLayout/></Suspense>}>
          <Route index path="/" element={<Suspense fallback={<Loader/>}><Home /></Suspense>} />
          <Route path="/explore" element={<Suspense fallback={<Loader/>}><Explore /></Suspense>} />
          <Route path="/all-users" element={<Suspense fallback={<Loader/>}><AllUsers /></Suspense>} />
          <Route path="/saved" element={<Suspense fallback={<Loader/>}><Saved /></Suspense>} />
          <Route path="/create-post" element={<Suspense fallback={<Loader/>}><CreatePost /></Suspense>} />
          <Route path="/update-post/:id" element={<Suspense fallback={<Loader/>}><EditPost/></Suspense>}/>
          <Route path="/post/:id" element = {<Suspense fallback={<Loader/>}><PostPopUp/></Suspense>}/>
          <Route path="/profile/:id" element = {<Suspense fallback={<Loader/>}><UserProfile/></Suspense>}/>
        </Route>
        
      </Routes>
      <Toaster />
   
    </main>
  )
}

export default App
