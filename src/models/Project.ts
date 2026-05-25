import mongoose, { Schema } from 'mongoose';
const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    minlength: [2, 'Минимальная длина поля - 2'],
    maxlength: [150, 'Максимальная длина поля "name" - 150']
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('project', projectSchema);