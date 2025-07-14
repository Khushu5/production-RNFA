const bcrypt =require('bcrypt')

//hash  password function

exports.hashPassword=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(5,(err,salt)=>{
            if(err){
                reject(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}


// compare || Decrypt 

exports.comparePassword =(password,hashed)=>{
    return bcrypt.compare(password,hashed);
}

