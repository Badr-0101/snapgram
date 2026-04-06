import type { INewPost, INewUser, IUpdatePost } from "@/types"
import { account,  avatars, storage,databases } from "./config"
import { ID, Query } from "appwrite"

export  const createUserAccount = async (user: INewUser) => {

    try {

        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl:avatarUrl,
        })
        
        return newUser

    } catch (error) {
        console.log(error)
        return error
    }
}
 
export async function saveUserToDB(user: {
    name:string
    accountId: string;
    email: string;
    imageUrl: URL;
    username: string;
}) {
    try {
        const newUser = await databases.createDocument(
           "695af0c40029d54c7658",
            "users",
            ID.unique(),
            user,
            
        )
        return newUser
    } catch (error) {
        console.log(error)
        return error
    }
}
export const signInAccount = async (user: {
    email: string,
    password: string
})=>{
    try {
        // Delete any existing session so switching accounts works correctly
        try {
            await account.deleteSession("current")
        } catch {
            // No active session to delete — that's fine
        }
        const session = await account.createEmailPasswordSession(user.email, user.password)
        return session
    } catch (error) {
        console.error(error)
        throw error   // throw so callers can detect failure via the try/catch
    }
}
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log("currentAccount")
    console.log(currentAccount)
    return currentAccount;
  } catch (error) {
    console.log(error)
  }
}
export const getCurrentUser = async()=>{
    try {
        const currentAccount = await getAccount() 
        if (!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            "695af0c40029d54c7658",
            "users",
            [Query.equal("accountId",currentAccount.$id)]
        )
        if(!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current")
        return session
    } catch (error) {
        console.error(error)
        throw error
    }
}
export async function createPost(post: INewPost) {
        try {
            const uploadedFile = await uploadFile(post.file[0]);
            if (!uploadedFile) throw Error;
            const fileUrl = storage.getFileView(
                 '695af0620039e18a0f9f',
               uploadedFile.$id
          );
          console.log(fileUrl)
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error
            }
            const tags = post.tags?.replace(/ /g, "").split(",") || [];
            const newPost = await databases.createDocument(
                "695af0c40029d54c7658",
                "post",
                ID.unique(),
                {
                    creator: post.userId,
                    caption: post.caption,
                    imageUrl: fileUrl,
                    imageId: uploadedFile.$id,
                    location: post.location,
                    tags:tags,
                }
            )
            if (!newPost) {
                await deleteFile(uploadedFile.$id);
                throw Error
            }
            return newPost
        } catch (error) {
            console.log(error)
            return error
        }
}
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      '695af0620039e18a0f9f',
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFileView(
      '695af0620039e18a0f9f',
      fileId
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile('695af0620039e18a0f9f', fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      "695af0c40029d54c7658",
      "post",
      [
        Query.orderDesc("$createdAt"),
        Query.limit(20),
        Query.select([
          "*",
          "creator.$id",
          "creator.name",
          "creator.imageUrl",
        ]),
      ]
    );

    if (!posts) throw new Error("No posts found");

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function likePost(postId: string, likeArray: string[]) {
  try {
     const updatePost = await databases.updateDocument(
    "695af0c40029d54c7658",
    "post",
      postId,
    {
    
      likes: likeArray
    }
    )
    if (!updatePost) throw Error
    return updatePost
  } catch (error) {
    console.log(error)
  }
}
export async function savePost( userId: string,postId: string){
  try {
    const updatedPost = await databases.createDocument(
      "695af0c40029d54c7658",
     'saves',
      ID.unique(),
      {
         user:userId,
        post:postId
       
      }
    )
    if (!updatedPost) throw Error
    return updatedPost
  } catch (error) {
    console.log(error)

  }
}
export async function deletSavePost(saveRecordId: string) {
  try {
     const statusCode = await databases.deleteDocument(
    "695af0c40029d54c7658",
   'saves',
    saveRecordId
  )
    if (!statusCode) throw Error
    return {status:"OK"}
  } catch (error) {
    console.log(error)
  }
 
  
}
export async function getUserSavedPosts(userId: string) {
  return databases.listDocuments(
    "695af0c40029d54c7658",
   'saves',
    [
      Query.equal("user", userId),
      Query.select([
          "$id",
          "post.$id",
          "post.caption",
          "post.imageUrl",
          "post.location",
          "post.creator.$id",
          "post.creator.name",
          "post.creator.imageUrl",
        ])
    ]
  )
}
export async function getUserById(userId: string) {
  return databases.getDocument(
    "695af0c40029d54c7658",
   'users',
    userId
  )
}
export async function getPostById(postId: string) {
  try {
    const post = await databases.getDocument(
      "695af0c40029d54c7658",
      "post",
      postId, [
         Query.select([
          "*",
          "creator.$id",
          "creator.name",
          "creator.imageUrl",
        ]),
      ]
      
    )
    return post
  } catch (error) {
    console.log(error)
    return error
  }
}
export async function updatePost(post:IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    }
    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error
      const fileUrl = storage.getFileView(
        '695af0620039e18a0f9f',
        uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error
      }
      image = {...image, imageUrl:fileUrl ,imageId:uploadedFile.$id}
    }
    const tags = post.tags?.replace(/ /g, "").split(",") || [];
    const updatedPost = await databases.updateDocument(
      "695af0c40029d54c7658",
      "post",
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags:tags,
      }
    )
    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId)
      }
      throw Error
    }
    if (hasFileToUpdate) {
      await deleteFile(post.imageId)
    }
    return updatedPost;
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function deletePost(postId: string, imageId: string) {
  if (!postId || !imageId) throw Error;
  try {
    await databases.deleteDocument(
      "695af0c40029d54c7658",
      "post",
      postId
    )
    return{status: 'ok'}
  } catch (error) {
    console.log(error)
  }
}
export async function getUserPosts(userId?: string) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      "695af0c40029d54c7658",
      "post",
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({
  pageParam,
}: {
  pageParam?: string;
}) {
  const queries = [
    Query.orderDesc("$updatedAt"),
    Query.limit(9),
  ];

 
  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam));
  }

  try {
    const posts = await databases.listDocuments(
      "695af0c40029d54c7658",
      "post",
      queries
    );

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      "695af0c40029d54c7658",
      "post",
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {

  try {
    const users = await databases.listDocuments(
      "695af0c40029d54c7658",
      "users",
      [Query.orderDesc("$createdAt")]
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}


export function getOptimizedFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      '695af0620039e18a0f9f', 
      fileId,
      500,      
      500,      
      'center', 
      80        
    );
    console.log("optimized",fileId,fileUrl)
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}