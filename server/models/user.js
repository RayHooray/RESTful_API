import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

UserSchema.pre('save', function (next)  {
    const user = this;
    //检测密码是否有修改
    if(!user.isModified('password')) {
        //没有修改，不执行任何操作
        return next()
    }
    //密码加密

    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if(hashErr) {
                return next(hashErr)
            }
            user.password = hash
            next()
        })
    })
})

//此方法会被添加到model上，也就是model通过Shema实例调用methods方法进行添加方法和属性
UserSchema.methods.comparePassword = function (toCompare, done) {
    bcrypt.compare(toCompare, this.password, (err, isMatch) => {
        if(err) {
            done(err)
        }else {
            done(err, isMatch)
        }
    })
}

export default mongoose.model('User', UserSchema)