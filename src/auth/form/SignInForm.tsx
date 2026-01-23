'use client';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/formcomponents/form';
import { Input } from '@/components/ui/formcomponents/input';

import Loader from '@/components/ui/shared/Loader';
import { toast } from 'sonner';

import { useUserContext } from '@/context/AuthContext';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';

function SignInForm() {
  const navigate = useNavigate();

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isPending: isLoading } =
    useSignInAccount();

  const formSchema = z.object({
    email: z.string().min(2, { message: 'email is required' }).max(50),
    password: z.string().min(8, { message: 'password is required' }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const session = await signInAccount(values);

    if (!session) {
      toast('login faild pleas try again.');
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast('login faild pleas try again.');
      return;
    }

    console.log(values);
  }
  return (
    <div className="flex flex-center flex-col sm:w-420 ">
      <img src="/public/assets/images/logo.svg" alt="logo" />
      <h2 className={'h3-bold md:h2-bold pt-5 sm:pt-12'}>
        create anew account
      </h2>
      <p className={'text-light-3'}>
        to use Sanpgram please enter your details
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className=" cursor-pointer shad-button_primary w-full mt-3"
          >
            {isLoading || isUserLoading ? (
              <div className="flex flex-center gap-1.5">
                <Loader /> isloading...
              </div>
            ) : (
              'submit'
            )}
          </Button>
          <p>
            {' '}
            Don&apos;t have an account?{' '}
            <Link to={'/signup'} className="text-primary-500 cursor-pointer">
              {' '}
              sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default SignInForm;
