import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    uesr: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Task', TaskSchema)