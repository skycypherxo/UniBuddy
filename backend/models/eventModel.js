const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  repeat: { type: Boolean, default: false },
  repeatFrequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], default: 'weekly' },
  repeatUntil: { type: Date }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
