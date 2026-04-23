import mongoose from 'mongoose'

const repoSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  githubId:    { type: Number, required: true },
  name:        { type: String, required: true },
  description: { type: String },
  stars:       { type: Number, default: 0 },
  forks:       { type: Number, default: 0 },
  language:    { type: String },
  url:         { type: String },
  homepage:    { type: String },
  featured:    { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Repo', repoSchema)