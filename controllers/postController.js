const postModel = require("../models/postModel");

// for Create post
const createPostController =async (req,res)=>{
    try {
        const {title,description}=req.body
        //validate
        if(!title || !description){
            return res.status(500).send({
                success:false,
                message:'Please Provide All fields'
            })
        }
        const post =await postModel({
            title,
            description,
            postedBy:req.auth._id
        }).save();
         
         res.status(201).send({
            success:true,
            message:'Post Created Successfully',
            post,
        });
        console.log(req)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create post Api',
            error
        })
    }
};


// get all posts 
const getAllPostsController=async (req,res)=>{
    try {
        const posts = await postModel.find()
        .populate('postedBy','_id name')
        .sort({createdAt :-1})
        res.status(200).send({
            success:true,
            message:'All Posts Data',
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in GET ALL POSTS API',
            error
        })
    }

}

//get user posts
const getUserPostsController =async (req,res)=>{
    try {
        const userPosts = await postModel.find({postedBy:req.auth._id})  //compare the user id of the user 
        res.status(200).send({
            success:true,
            message:'user posts',
            userPosts,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in User Post Api',
            error
        })
    }
}


const deletePostController =async(req,res)=>{
    try {
        const {id} =req.params
        await postModel.findByIdAndDelete({_id:id})
        res.status(200).send({
            success:true,
            message:'Your Post has been deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete post APi',
            error
        })
    }

}

//update post 

const updatePostController =async(req,res)=>{
    try {
        const {title , description} = req.body;
         //post find 

         const post = await postModel.findById({_id:req.params.id})

          console.log('Decoded Token from req.auth:', req.auth);


         //validation
         if(!title || !description){
            return res.status(500).send({
                success:false,
                message:'Please provide post title and description',
            })
         }

         const updatedPost =await postModel.findByIdAndUpdate({_id :req.params.id},
            {
                title : title || post?.title,
                description:description || post?.description
                
         },{new:true})
         res.status(200).send({
            success:true,
            message:'Post Updated Successfully',
            updatedPost,
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Update Post Api',
            error,
        })
    }

}




module.exports={createPostController,getAllPostsController,getUserPostsController,deletePostController,updatePostController}