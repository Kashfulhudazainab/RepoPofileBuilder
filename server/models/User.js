import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  githubId:    { type: String, required: true, unique: true },
  username:    { type: String, required: true },
  name:        { type: String },
  email:       { type: String },
  avatar:      { type: String },
  bio:         { type: String },
  githubToken: { type: String },
  customLanguages: {
    type: [String],
    default: []
  }
}, { timestamps: true })

export default mongoose.model('User', userSchema)