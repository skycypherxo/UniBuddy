// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { v4 as uuidv4 } from "uuid";
// import { add, format, isBefore } from "date-fns";

// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [eventDetails, setEventDetails] = useState({
//     title: '',
//     startDate: '',
//     startTime: '',
//     endDate: '',
//     endTime: '',
//     repeat: false,
//     repeatFrequency: 'weekly',
//     repeatUntil: ''
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   function handleDateClick(arg) {
//     setEventDetails({
//       ...eventDetails,
//       startDate: arg.dateStr,
//       endDate: arg.dateStr,
//       startTime: '09:00',
//       endTime: '10:00',
//     });
//     setIsModalOpen(true);
//   }

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//     setEventDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     const { title, startDate, startTime, endDate, endTime, repeat, repeatFrequency, repeatUntil } = eventDetails;
//     const start = new Date(`${startDate}T${startTime}`);
//     const end = new Date(`${endDate}T${endTime}`);
//     const newEvents = [];
    
//     let currentStart = start;
//     const repeatOptions = {
//       daily: { days: 1 },
//       weekly: { weeks: 1 },
//       monthly: { months: 1 },
//       yearly: { years: 1 }
//     };

//     // Create the initial event
//     newEvents.push({
//       id: uuidv4(),
//       title,
//       start: currentStart.toISOString(),
//       end: end.toISOString(),
//       allDay: !startTime && !endTime,
//     });

//     // Handle repeating events
//     if (repeat) {
//       let repeatUntilDate = new Date(repeatUntil);
      
//       while (isBefore(currentStart, repeatUntilDate)) {
//         currentStart = add(currentStart, repeatOptions[repeatFrequency]);
//         newEvents.push({
//           id: uuidv4(),
//           title,
//           start: currentStart.toISOString(),
//           end: add(currentStart, {
//             minutes: end.getMinutes() - start.getMinutes(),
//             hours: end.getHours() - start.getHours(),
//             days: end.getDate() - start.getDate()
//           }).toISOString(),
//           allDay: !startTime && !endTime,
//         });
//       }
//     }

//     setEvents([...events, ...newEvents]);
//     setIsModalOpen(false);
//   }

//   function handleEventClick(clickInfo) {
//     if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
//       setEvents(events.filter((event) => event.id !== clickInfo.event.id));
//     }
//   }

//   return (
//     <div className="relative">
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         headerToolbar={{
//           start: "today prev,next",
//           center: "title",
//           end: "dayGridMonth,timeGridWeek,timeGridDay",
//         }}
//         height="90vh"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//       />
//            {/* Modal for Event Details */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h3 className="text-xl font-bold mb-4">Event Details</h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Title</label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={eventDetails.title}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   placeholder="Enter event title"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2" htmlFor="startDate">Start Date</label>
//                   <input
//                     type="date"
//                     id="startDate"
//                     name="startDate"
//                     value={eventDetails.startDate}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2" htmlFor="startTime">Start Time</label>
//                   <input
//                     type="time"
//                     id="startTime"
//                     name="startTime"
//                     value={eventDetails.startTime}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2" htmlFor="endDate">End Date</label>
//                   <input
//                     type="date"
//                     id="endDate"
//                     name="endDate"
//                     value={eventDetails.endDate}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2" htmlFor="endTime">End Time</label>
//                   <input
//                     type="time"
//                     id="endTime"
//                     name="endTime"
//                     value={eventDetails.endTime}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Repeat</label>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="repeat"
//                     name="repeat"
//                     checked={eventDetails.repeat}
//                     onChange={handleChange}
//                     className="form-checkbox"
//                   />
//                   <span className="ml-2">Repeat</span>
//                 </div>
//                 {eventDetails.repeat && (
//                   <div className="mt-4">
//                     <label className="block text-gray-700 font-medium mb-2" htmlFor="repeatFrequency">Repeat Frequency</label>
//                     <select
//                       id="repeatFrequency"
//                       name="repeatFrequency"
//                       value={eventDetails.repeatFrequency}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg"
//                     >
//                       <option value="daily">Daily</option>
//                       <option value="weekly">Weekly</option>
//                       <option value="monthly">Monthly</option>
//                       <option value="yearly">Yearly</option>
//                     </select>
//                     <label className="block text-gray-700 font-medium mt-4 mb-2" htmlFor="repeatUntil">Repeat Until</label>
//                     <input
//                       type="date"
//                       id="repeatUntil"
//                       name="repeatUntil"
//                       value={eventDetails.repeatUntil}
//                       onChange={handleChange}
//                       className="w-full p-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
//               >
//                 Save Event
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="w-full mt-2 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Calendar;

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { add, format, isBefore } from "date-fns";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    repeat: false,
    repeatFrequency: 'weekly',
    repeatUntil: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUserEvents() {
      try {
        const response = await axios.get('http://localhost:3000/api/events/user-events', { withCredentials: true });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchUserEvents();
  }, []);

  function handleDateClick(arg) {
    setEventDetails({
      ...eventDetails,
      startDate: arg.dateStr,
      endDate: arg.dateStr,
      startTime: '09:00',
      endTime: '10:00',
    });
    setIsModalOpen(true);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { title, startDate, startTime, endDate, endTime, repeat, repeatFrequency, repeatUntil } = eventDetails;
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    const newEvent = {
      title,
      start,
      end,
      repeat,
      repeatFrequency,
      repeatUntil,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/events/create', newEvent, { withCredentials: true });
      console.log('Event saved:', response.data);
      setEvents([...events, { ...newEvent, id: response.data._id }]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  function handleEventClick(clickInfo) {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  }

  return (
    <div className="relative">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="90vh"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />

      {/* Modal for Event Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Event Details</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={eventDetails.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={eventDetails.startDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="startTime">Start Time</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={eventDetails.startTime}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={eventDetails.endDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="endTime">End Time</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={eventDetails.endTime}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Repeat</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="repeat"
                    name="repeat"
                    checked={eventDetails.repeat}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Repeat</span>
                </div>
                {eventDetails.repeat && (
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="repeatFrequency">Repeat Frequency</label>
                    <select
                      id="repeatFrequency"
                      name="repeatFrequency"
                      value={eventDetails.repeatFrequency}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    <label className="block text-gray-700 font-medium mt-4 mb-2" htmlFor="repeatUntil">Repeat Until</label>
                    <input
                      type="date"
                      id="repeatUntil"
                      name="repeatUntil"
                      value={eventDetails.repeatUntil}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Save Event
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;


