const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
  try {
    console.log(req.body , req.user.id);
    const { title, start, end, repeat, repeatFrequency, repeatUntil } = req.body;
    const userId = req.user.id;
    const newEvent = new Event({
      userId,
      title,
      start,
      end,
      repeat,
      repeatFrequency,
      repeatUntil
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

const getUserEvents = async (req, res) => {
    try {
      const userId = req.user.id;
      const events = await Event.find({ userId }); 
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  };
  

module.exports = { createEvent, getUserEvents };
