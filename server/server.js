import express, { application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Post from './models/Post.js';
import Userx from './models/User.js';

dotenv.config();
const app = express();

//middleware
app.use(express.json());
//app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));

//app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


//POST A SINGLE POST
app.post('/api/posts', async (req, res) => {

      const postsx = await Post.find({ hidden: false })
          .sort({ createdAt: -1 })
          .limit(1);
    let op = postsx[0].numbers + 1;
    const userName = req.body.userName;
    const description = req.body.description;
    const createdAt = req.body.createdAt;
    const postUserId = req.body.postUserId;
    const yeni = req.body.yeni;
    const gender = req.body.gender;
    if (!userName || !description || !createdAt) return;
    try {
        const newPost = new Post ({
            postUserId: postUserId,
            userName: userName,
            description: description,
            createdAt: createdAt,
            yeni: yeni,
            gender: gender,
            numbers: op,
        })
        await newPost.save();
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch(error){
        res.status(404).json({message: error.message});
}
});


//GET ALL POSTS

app.get('/api/posts', async (req, res) => {
  //await Post.updateMany({ hidden: { $exists: false } }, { $set: { hidden: false } });
  //await Post.updateMany({ undeletable: { $exists: false } }, { $set: { undeletable: false } });
  const page = req.query.page || 1;
  const pageSize = page * 20; // Adjust the page size as needed

  try {
      const posts = await Post.find({ hidden: false })
          .sort({ createdAt: -1 })
          .limit(pageSize);

      res.status(200).json(posts);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

/*
app.patch('/api/uposts', async (req, res) => {
 
   try {
       const posts = await Post.find({ hidden: false })
          
      const postsx = await Post.find({ hidden: false })
           .sort({ createdAt: -1 })
           .limit(1);
        let op = postsx[0].numbers;
       
        let ct = 1;
        for (const post of posts) {
          const numbers =ct;
          post.numbers = numbers;
          await post.save();
            ct++;
          }
         let cx = ct - 1;
        for (const post of posts) {
         
          cx--;
        }
         
 
       res.status(200).json(op);
   } catch (error) {
       res.status(404).json({ message: error.message });
   }
 });
*/



//GET NEW POSTS
app.get('/api/posts/new', async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = page * 20; // Adjust the page size as needed

  try{
      const posts = await Post.find({ yeni: true, hidden:false })
      .sort({createdAt: -1})
      .limit(pageSize);
      res.status(200).json(posts);
  }
  catch(error){
      res.status(404).json({message: error.message});
  }
});

//GET HIDDEN POSTS    
app.get('/api/posts/hidden', async (req, res) => {

  try{
      const posts = await Post.find({ hidden:false }).sort({createdAt: -1});
      res.status(200).json(posts);
  }
  catch(error){
      res.status(404).json({message: error.message});
  }
});
//GET A SINGLE POST
app.get('/api/posts/:id', async (req, res) => {
    try{
        const postId = req.params.id;
        const post = await Post.findOne({_id: postId});
        res.status(200).json(post);
    }catch(error){
        res.status(404).json({message: error.message});
    }
});

app.get('/api/postspage/:id', async (req, res) => {
  try{
      const postsx = await Post.find()
        .sort({ createdAt: -1 })
        .limit(1);
      let opx = postsx[0].numbers; 
      const postId = req.params.id;
      const post = await Post.findOne({_id: postId});
      let  op = post.numbers;
      let pageSize = 20;
      let ret = Math.ceil((opx - op) / pageSize);
      res.status(200).json(ret);
  }catch(error){
      res.status(404).json({message: error.message});
  }
});

//DELETE ALL POSTS
app.delete('/xapi/posts', async (req, res) => {

    try {
        const deletedPosts = await Post.deleteMany();

        // Send a success response
        res.status(200).json({ message: `Posts deleted successfully${deletedPosts}` });
    
    } catch (error) {
        res.status(500).json({ message: 'Error deleting posts', error: error.message });
    }
});

// DELETE A SINGLE POST
app.delete('/xapi/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);
        res.status(200).json(deletedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
});

//GET A SINGLE USER
app.get('/api/user', async (req, res) => {
    try{
        const createdAt = req.query.createdAt;
        const users = await Userx.findOne({createdAt: createdAt});
        res.status(200).json(users);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
});

//REGISTER A USER
app.post('/api/user', async (req, res) => {
    
    try{
        const newUser = new Userx ({
            createdAt: req.body.createdAt
        });
        await newUser.save();

        res.status(200).json(newUser);

    } catch(error){
        res.status(404).json(`please {message: ${error.message}`);
    }
})

// LIKE A POST
app.patch("/api/posts/:id/like", async (req, res) => {

    try{
        const  postId  = req.params.id;
        const { idx }  = req.body;
        const post = await Post.findById(postId);
        const isLiked = post.likes.includes(idx);
        if(isLiked ){
            post.likes = post.likes.filter((element) => element !== idx);
        } else{
            post.likes.push(idx);
        }
       
        
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { likes: post.likes ,
             likedAt : Date.now() },
            { new: true }
        );
        res.status(200).json(updatedPost);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
})
// HIDE a POST
app.patch("/api/posts/:id/hidden", async (req, res) => {

  try{
      const  postId  = req.params.id;
      const { idx }  = req.body;
      const post = await Post.findById(postId);
      const isHidden = post.hidden;
      if(isHidden ){
          post.hidden = false;
      } else{
          if(post.undeletable === false) post.hidden = true;
      }
     
      
      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { hidden: post.hidden , },
          { new: true }
      );
      res.status(200).json(updatedPost);
  }
  catch(error){
      res.status(404).json({message: error.message});
  }
})
// SET UNDELETABLE
app.patch("/api/posts/:id/undeletable", async (req, res) => {

  try{
      const  postId  = req.params.id;
      const { idx }  = req.body;
      const post = await Post.findById(postId);
      const undeletable = post.undeletable;
    
      post.undeletable = true;
      post.hidden = false;
      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { undeletable: post.undeletable , 
           hidden: post.hidden},
          { new: true }
      );
      res.status(200).json(updatedPost);
  }
  catch(error){
      res.status(404).json({message: error.message});
  }
})

// UNDO UNDELETABLE
app.patch("/api/posts/:id/undoundeletable", async (req, res) => {

  try{
      const  postId  = req.params.id;
      const { idx }  = req.body;
      const post = await Post.findById(postId);
      const undeletable = post.undeletable;
    
      post.undeletable = false;
      post.hidden = true;
      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { undeletable: post.undeletable , 
           hidden: post.hidden},
          { new: true }
      );
      res.status(200).json(updatedPost);
  }
  catch(error){
      res.status(404).json({message: error.message});
  }
})
//DISLIKE A POST
app.patch("/api/posts/:id/dislike", async (req, res) => {
  try{
      const  postId  = req.params.id;
      const { idx }  = req.body;
      const post = await Post.findById(postId);
      const isDisLiked = post.dislikes?.includes(idx);
      if(isDisLiked ){
          post.dislikes = post.dislikes?.filter((element) => element !== idx);
      } else{
          post.dislikes.push(idx);
      }
     
      
      const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { dislikes: post?.dislikes ,
           dislikedAt : Date.now() },
          { new: true }
      );
      res.status(200).json(updatedPost);
  }
  catch(error){
      res.status(404).json({message: error.message});
  }
})
//LIKE A COMMENT

app.patch("/api/posts/:id/:commentId/like", async (req, res) => {

    try{
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { idx }  = req.body;
        const post = await Post.findById(postId);

        // Find the comment with the specified commentId
        const comment = post.comments.find(comment => comment[commentId] && comment[commentId].commentId === commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const commentData = comment[commentId] || [];
        
        
        const isLiked = (commentData.likes).includes(idx);
  
        if(isLiked ){
            commentData.likes = commentData.likes.filter((element) => element !== idx);
            commentData.likedAt = new Date();
        } else{ 
            commentData.likes.push(idx);
            commentData.likedAt = new Date();
        }

 

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { comments: post.comments , // Replace the comments array in the post with the modified one
             },
            { new: true } // Return the updated post
        );


        res.status(200).json(updatedPost);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
})


// Add a comment
app.patch("/api/posts/:id/comment", async (req, res) => {

    try{
        const postId = req.params.id;
        
        const post = await Post.findById(postId);
        const { commentId } = req.body;
        const commentObject = {
            [commentId]: req.body
        }
        post.comments.unshift(commentObject);

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { comments: post.comments,
              commentedAt : Date.now() 
            },
            { new: true }
        );
        res.status(200).json(updatedPost);

    } catch(error){
        res.status(404).json({message: error.message});
    }

});


// reply to a comment

app.patch("/api/posts/:postId/:commentId/reply", async (req, res) => {
    try{

        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const post = await Post.findById(postId);

        const { replyId } = req.body;
        const innerComment = post.comments.find((c) => c[commentId]);
        if (!innerComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        req.body.commentedAt = new Date();
        const replyObject = {
            [replyId]: req.body,
        };
        
        if(!innerComment[commentId].comments){
            innerComment[commentId].comments = [];
        }
        innerComment[commentId].comments.unshift(replyObject);
        innerComment[commentId].commentedAt = new Date();
    
        const updatedPost = await Post.findByIdAndUpdate(
           postId,
           { comments: post.comments },
           { new: true }
        );

       res.status(200).json(updatedPost);

    }catch(error){
        res.status(404).json({message: error.message});
    }
})
//llike a reply
app.patch("/api/posts/:id/:commentId/:replyId/like", async (req, res) => {
    try {
      const postId = req.params.id;
      const commentId = req.params.commentId;
      const replyId = req.params.replyId;
      const { idx } = req.body;
  
      // Retrieve the post from the database
      const post = await Post.findById(postId);
  
      // Find the comment with the specified commentId
      const comment = post.comments.find(
        (comment) =>
          comment[commentId] && comment[commentId].commentId === commentId
      );
  
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      // Find the reply with the specified replyId inside the comment
      const reply = comment[commentId].comments.find(
        (reply) => reply[replyId] && reply[replyId].replyId === replyId
      );
  
      if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
      }
  
      const replyData = reply[replyId] || [];
  
      const isLiked = replyData.likes.includes(idx);
      replyData.likedAt = new Date();
      if (isLiked) {
        replyData.likes = replyData.likes.filter((element) => element !== idx);
      } else {
        replyData.likes.push(idx);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { comments: post.comments },
        { new: true }
    );

    res.status(200).json(updatedPost);
      //res.status(200).json(replyData.likes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// get like count notification for a post

  app.get('/api/posts/user/like/:postUserId', async (req, res) => {
    try {
      const postUserId = req.params.postUserId;
      const posts =  await Post.find({ postUserId: postUserId });
     
      // Extracting relevant data fields from each post
      const filteredPosts = posts.map(post => {
        return {
          likesCount: post.likes.length,
          description: post.description,
          likedAt: post.likedAt,
          postId: post._id,
        };
      });
      
      res.status(200).json(filteredPosts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });


// get comment count notification for a post

  app.get('/api/posts/user/comment/:postUserId', async (req, res) => {
    try {
      const postUserId = req.params.postUserId;
      const posts =  await Post.find({ postUserId: postUserId });
     
      // Extracting relevant data fields from each post
      const filteredPosts = posts.map(post => {
        return {
          commentsCount: post.comments.length,
          description: post.description,
          commentedAt: post.commentedAt,
          postId: post._id
        };
      });
      
      res.status(200).json(filteredPosts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }); 

// get like count notification for comment
  app.get('/api/posts/post/comment/:userId', async (req, res) => {
    const userId = req.params.userId;
    const comments = [];
    const replies = [];
    const subReplies = [];
    
    const post = await Post.find();

    post.forEach((post) => {
            comments.push(post.comments);
      });

    comments.forEach((comment) => {
        replies.push(comment);
    });


      
    const filteredLengths = replies.map((objectGroup, index1) =>
    objectGroup
        .filter((commentObject) => {
        const commentData = commentObject[Object.keys(commentObject)[0]];
        return commentData.idx ===  userId;
        })
        .map((commentObject, index2) => {
        const commentData = commentObject[Object.keys(commentObject)[0]];
        const likesCount = commentData.likes.length;
        //const commentsCount = commentData.comments.length;
        const description = commentData.description;
       // const createdAt = commentData.createdAt;
       const likedAt = commentData.likedAt;
       const postId = commentData.postId;
        return {
       
            likesCount: likesCount,
            description: description,
            likedAt: likedAt,
            postId: postId,

        };
        }));

    res.status(200).json(filteredLengths);
    
  });

  // get like count notification for reply
  app.get('/api/posts/post/comment/replies/:userId', async (req, res) => {
    const userId = req.params.userId;
    const post = await Post.find();
  
    // Initialize an array to store the result for each reply
    const replyLikesCounts = [];
  
    // Iterate through posts and comments to find replies and calculate likes counts
    post.forEach((post) => {
      post.comments.forEach((commentObject) => {
        const commentData = commentObject[Object.keys(commentObject)[0]];
  
        // Check if the comment matches the userId
        if (commentData.idx === userId && commentData.comments) {
          commentData.comments.forEach((replyObject) => {
            const replyData = replyObject[Object.keys(replyObject)[0]];
            const likesCount = replyData.likes.length;
            const description = replyData.description;
            const likedAt = replyData.likedAt;
            const postId = replyData.postId;
  
            // Add the reply likes count to the result array
            replyLikesCounts.push({
              likesCount: likesCount,
              description: description,
              likedAt: likedAt,
              postId: postId,
            });
          });
        }
      });
    });
  
    res.status(200).json(replyLikesCounts);
  });
  
  
  




// get comment count notification for reply
app.get('/api/posts/post/reply/:userId', async (req, res) => {
    const userId = req.params.userId;
    const comments = [];
    const replies = [];
    const subReplies = [];
    
    const post = await Post.find();

    post.forEach((post) => {
            comments.push(post.comments);
      });

    comments.forEach((comment) => {
        replies.push(comment);
    });


      
    const filteredLengths = replies.map((objectGroup, index1) =>
    objectGroup
        .filter((commentObject) => {
        const commentData = commentObject[Object.keys(commentObject)[0]];
        return commentData.idx ===  userId;
        })
        .map((commentObject, index2) => {
        const commentData = commentObject[Object.keys(commentObject)[0]];
       // const likesCount = commentData.likes.length;
        const commentsCount = commentData.comments.length;
        const description = commentData.description;
       // const createdAt = commentData.createdAt;
       const commentedAt = commentData.commentedAt;
       const postId = commentData.postId;
        return {
       
            commentsCount: commentsCount,
            description: description,
            commentedAt: commentedAt,
            postId: postId
        };
        }));

    res.status(200).json(filteredLengths);
    
  });

app.get('/api/posts/post/replyx/:userId/:postId', async (req, res) => {
  const userId = req.params.userId;
  
  const comments = [];
  const replies = [];
  const subReplies = [];
  
  const post = await Post.find({ _id: req.params.postId});

  post.forEach((post) => {
          comments.push(post.comments);
    });

  comments.forEach((comment) => {
      replies.push(comment);
  });


    
  const filteredLengths = replies.map((objectGroup, index1) =>
  objectGroup
      .filter((commentObject) => {
      const commentData = commentObject[Object.keys(commentObject)[0]];
      return true;
      })
      .map((commentObject, index2) => {
      const commentData = commentObject[Object.keys(commentObject)[0]];
      const commentsCount = commentData.comments.length;
  
      return {
     
          commentsCount: commentsCount,
      };
      }));

  res.status(200).json(filteredLengths);
  
});

/* app.get('*', (req, res) => {
    res.sendFile('/root/iturafcom/server/static/index.html');
  }) */
const PORT = process.env.PORT || 5000;

  const posts = []
  mongoose
      .connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      })
      .then(() => {
          app.listen(PORT, () => console.log(`Serverx running on port: ${PORT}`));
      })
      .catch((error) => console.log(error.message));
