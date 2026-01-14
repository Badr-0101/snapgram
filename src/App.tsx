import { Routes, Route } from "react-router-dom"
//Authpage
import AuthLayout from "./auth/AuthLayout"
import SignInForm from "./auth/form/SignInForm"
import SignUpFrom from "./auth/form/signUpForm/SignUpFrom"
//Rootpage
import  {RootLayout,Home,Saved,AllUsers,CreatePost,Explore,PostDetails,EditPost}  from "./root/page/index"

import { Toaster } from "@/components/ui/sonner"


function App() {
 
  return (
    <main>
      <Routes>
        {/* public Route */}
        <Route element={<AuthLayout />}>
              <Route path="/signIn" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpFrom />} />
        </Route>

        {/* privet Route */}
        <Route element={<RootLayout/>}>
          <Route index path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost/>}/>
          <Route path="/post/:id" element = {<PostDetails/>}/>
        </Route>
        
      </Routes>
      <Toaster />
   
    </main>
  )
}

export default App
