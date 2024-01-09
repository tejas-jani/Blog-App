import { Router } from 'express';
import { isLogedIn } from '../controller/auth.js';
import { uploadMiddleware } from '../multer.js';
import { createPost, getAllPost, getPostById, updatePost } from '../controller/post.js';
 

const router = Router();

  
router.get("/post/:id",getPostById);
router.get("/posts", getAllPost);
router.post("/post",isLogedIn,uploadMiddleware.single("file"),createPost);
router.put("/post",isLogedIn,uploadMiddleware.single("file"),updatePost)



 
export const postRoutes =  router;

 

 