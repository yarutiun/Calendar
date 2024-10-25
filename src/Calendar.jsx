import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import style from "./Calendar.module.css";

const Calendar = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  const days = [...Array.from({ length: 31 }, (_, index) => index + 1)];
  const [events, setEvents] = useState({});
  const [color, setColor] = useState("lightskyblue");
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventInput, setEventInput] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [selectedEventColor, setSelectedEventColor] = useState("");
  const [draggedEvent, setDraggedEvent] = useState(null); // Store the dragged event

  useEffect(() => {
    if (editShow) {
      setShow(false);
    }
  }, [show, editShow]);

  const handleDayClick = (day) => {
    if (!editShow) {
      setSelectedDay(day);
      setShow(true);
    }
  };

  const handleEventClick = (day, event, index, eventColor) => {
    setSelectedDay(day);
    setSelectedEvent(event);
    setSelectedEventIndex(index);
    setSelectedEventColor(eventColor);
    setEditShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setEventInput("");
    setColor("lightskyblue");
  };

  const handleEditClose = () => {
    setEditShow(false);
    setSelectedEvent("");
  };

  const handleSaveEvent = () => {
    if (!eventInput) return;

    setEvents((prevEvents) => {
      const updatedEvents = {
        ...prevEvents,
        [selectedDay]: [
          ...(prevEvents[selectedDay] || []),
          { name: eventInput, color }, // Store event name and color
        ],
      };
      return updatedEvents;
    });

    setEventInput("");
    handleClose();
  };

  const handleUpdateEvent = () => {
    if (!selectedEvent) return;

    const updatedEvents = { ...events };
    updatedEvents[selectedDay][selectedEventIndex] = {
      name: selectedEvent,
      color: selectedEventColor,
    };

    setEvents(updatedEvents);
    handleEditClose();
  };

  const handleDeleteEvent = () => {
    const updatedEvents = { ...events };
    updatedEvents[selectedDay].splice(selectedEventIndex, 1);

    if (updatedEvents[selectedDay].length === 0) {
      delete updatedEvents[selectedDay];
    }

    setEvents(updatedEvents);
    handleEditClose();
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDragStart = (eventObj, day) => {
    setDraggedEvent({ ...eventObj, originalDay: day });
  };

  const handleDrop = (day) => {
    if (!draggedEvent) return;

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };

      // Remove event from the original day
      const originalDay = draggedEvent.originalDay;
      const originalDayEvents = updatedEvents[originalDay] || [];

      const newOriginalDayEvents = originalDayEvents.filter(
        (event) => event.name !== draggedEvent.name
      );

      if (newOriginalDayEvents.length === 0) {
        delete updatedEvents[originalDay];
      } else {
        updatedEvents[originalDay] = newOriginalDayEvents;
      }
      updatedEvents[day] = [
        ...(updatedEvents[day] || []),
        { name: draggedEvent.name, color: draggedEvent.color },
      ];

      return updatedEvents;
    });

    setDraggedEvent(null); 
  };

  return (
    <div className={style.mainContent}>
      <div className={style.calendarBox}>
        <div className={style.new}>
          <div className={style.calView}>Calendar View</div>
          <div className={style.time}>
            <div className={style.month}>
              <span>Month</span>
            </div>
            <div>
              <span>Week</span>
            </div>
            <div>
              <span>Day</span>
            </div>
            <div className={style.agenda}>
              <span>Agenda</span>
            </div>
          </div>
        </div>
        <div className={style.flex}>
          <div className={style.time} style={{ marginTop: "10px" }}>
            <div className={style.month}>
              <span>Today</span>
            </div>
            <div>
              <span>Back</span>
            </div>
            <div className={style.agenda}>
              <span>Next</span>
            </div>
          </div>
          <div className={style.centerText}>January 2018</div>
        </div>

        <div className={style.dayLabels}>
          {daysOfWeek.map((day) => (
            <div key={day} className={style.dayLabel}>
              {day}
            </div>
          ))}
        </div>

        <div className={style.gridContainer}>
          {days.map((day) => (
            <div
              key={day}
              className={style.gridItem}
              onClick={() => handleDayClick(day)}
              onDrop={() => handleDrop(day)}
              onDragOver={(e) => e.preventDefault()}
            >
              {day}
              {events[day] &&
                events[day].map((eventObj, index) => (
                  <div
                    key={index}
                    className={style.eventBox}
                    style={{ backgroundColor: eventObj.color }}
                    onClick={() =>
                      handleEventClick(
                        day,
                        eventObj.name,
                        index,
                        eventObj.color
                      )
                    }
                    draggable
                    onDragStart={() => handleDragStart(eventObj, day)}
                  >
                    {eventObj.name}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event for Day {selectedDay}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventInput">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                maxLength={30}
                placeholder="Enter event name"
                value={eventInput}
                onChange={(e) => setEventInput(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Choose color for event</Form.Label>
            <Form.Control
              as="select"
              onChange={handleColorChange}
              value={color}
            >
              <option value="lightskyblue">Lightsky Blue</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event for {selectedDay} of January</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editEventInput">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                maxLength={30}
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              />
            </Form.Group>
            <Form.Label>Choose color for event</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedEventColor(e.target.value)}
              value={selectedEventColor}
            >
              <option value="lightskyblue">Lightsky Blue</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="orange">Orange</option>
            </Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteEvent}>
            Delete Event
          </Button>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateEvent}>
            Update Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;