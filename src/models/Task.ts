const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  completed: Boolean,
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'project',
    require: true
  }
}, { timestamps: true });

export default mongoose.model('task', taskSchema);