
import {
  useNavigate,
  useForm,
  z,
  zodResolver,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Loader,
  toast,
  signUpSchema,
  useCreateUserAccount,
  useSignInAccount,
  useUserContext,
} from "./index"
import {Link} from "react-router-dom"
function SignUpFrom() {
  
  const navigate = useNavigate()
  const {mutateAsync:createUserAccount , isPending:isCreateingAccount} = useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSignIn } = useSignInAccount()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name:"",
      email: "",
      username:"",
      password: "",
      confirmPassword:"",
    },
  })
  
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
   
    const newUser = await createUserAccount(values)
    
    if (!newUser) {
          return toast("signup faild please try again")
    }

    const session = await signInAccount({
            email: values.email,
            password: values.password
    })

    if (!session) {
      return toast('sign in faild. please try again.')
    }

    const isLoggedIn = await checkAuthUser()
    
    if (isLoggedIn) {
      form.reset()
      navigate("/")
    } else {
      return toast('sign in faild. please try again.')
    }
  }

  
  return (
    <div >
    
      <Form {...form}>
        <div className="flex flex-center flex-col sm:w-420 ">
          <img src="/public/assets/images/logo.svg" alt="logo" />
          <h2 className={"h3-bold md:h2-bold pt-5 sm:pt-12"}>create anew account</h2>
          <p className={"text-light-3"}>to use Sanpgram please enter your details</p>
        <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col gap-2.5">
          <FormField
          control={form.control}
              name="name"
            
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input type="text"{...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
          />
              <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>user Name</FormLabel>
                <FormControl>
                  <Input type="text"{...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
          )}
          />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="text"{...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
          )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password"{...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
          )}
          />
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirmPassword</FormLabel>
                <FormControl>
                  <Input type="password"{...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
          )}
          />
            <Button type="submit" className=" cursor-pointer shad-button_primary">
              {isUserLoading || isCreateingAccount || isSignIn
                ? <div className="flex flex-center gap-1.5">
                  <Loader /> isloading...</div> : "submit"}
            </Button>
          </form>
          <p className="text-small-regular text-light-2 text-center mt-2">Already have an account ?
            <Link to="/signIn" className="text-primary-500" >sign in</Link></p>
        </div>
    </Form>
    </div>
  )
}


export default SignUpFrom
