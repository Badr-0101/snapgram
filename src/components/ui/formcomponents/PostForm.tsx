import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../Button';
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
import FileUploader from '../shared/FileUploader';

import {
  useCreatePost,
  useUpdatePost,
} from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { PostDocument } from '@/types';
const formSchema = z.object({
  caption: z.string().min(5).max(220),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

type TpostPorps = {
  post?: PostDocument;
  action: 'Create' | 'Update';
};
const PostForm = ({ post, action }: TpostPorps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (post && action === 'Update') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });
      if (!updatePost) {
        toast(`${action} post faild. please try again`);
      }
      return navigate(`/post/${post.$id}`);
    }

    const newPost = await createPost({
      ...values,
      userId: user.$id,
    });
    if (!newPost) {
      toast('pleas try again');
    }
    navigate(`/post/${post.$id}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">caption</FormLabel>
              <FormControl>
                <textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">add photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">add Location</FormLabel>
              <FormControl>
                <input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                add Tags(separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Art , Expression , Learn"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            className="shad-button_dark_4"
          >
            cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-500 whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate
              ? 'loading...'
              : `${action} post`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
