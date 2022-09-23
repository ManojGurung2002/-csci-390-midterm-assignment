import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Reminder from "./components/Reminder";


function App() {

  // Object to define the properties of the reminder
  const initialReminder = { title: "", completed: false, id: 0 }

  // State variable for reminder object
  const [reminder, setReminder] = useState(initialReminder)

  // State variable to store reminders
  const [reminders, setReminders] = useState([])

  // State variable to store whether to show Completed reminders or not in Boolean format
  const [showCompletedReminders, setShowCompletedReminders] = useState(false)

  // function to make new reminder
  function setNewReminder(e) {
    setReminder({
      title: e.target.value,
      completed: false,
      id: Math.floor(Math.random() * 1000)
    });
  }

  // function to add reminder into reminder Array
  function addReminder() {
    if (reminder.title){
      setReminders([...reminders, reminder]);
      setReminder(initialReminder);
    } else{
      {}
    } 
  }

  // function to mark the reminder as completed
  function completeReminder(id) {
    const result = reminders.map((item) => {
      if (item.id === id) {
        item.completed = true;
      }
      return item;
    });

    setReminders(result);
  }

  // function to toogle between the completed reminders or outstanding remainders
  function displayedReminders() {

    const retrived = []

    if (showCompletedReminders === true) {
      for (let i = 0; i < reminders.length; i++) {
        if (reminders[i].completed === true) {
          retrived.push(reminders[i]);
        }
      }
    }
    else {
      for (let i = 0; i < reminders.length; i++) {
        if (reminders[i].completed === false) {
          retrived.push(reminders[i]);
        }
      }
    }
    return retrived;
  }

  // function to delete reminder
  function deleteReminder(id) {
    const result = reminders.filter((e) => e.id !== id)
    setReminders(result);
  }

  return (
    <div className="app">
      
      {/* Header component to display about your app */}
      <Header />

      <input
        type="text"
        placeholder="Add a new reminder.."
        value={reminder.title}
        onChange={(e) => setNewReminder(e)}
      />
      <button onClick={addReminder}>Add Reminder</button>

      <div>
        <p>Showing : {showCompletedReminders ? 'Completed' : 'Outstanding'} reminders</p>
        <p>Click to <button onClick={() => setShowCompletedReminders((showCompleted) => !showCompleted)}> Show {showCompletedReminders ? "outstanding" : "completed"} reminders</button></p>
      </div>

      {/* To list the reminder in reminders array */}
      {displayedReminders().map((reminder) => (
        <div>


          <Reminder reminder={reminder} showCompletedReminders={showCompletedReminders} />

          {/* Used not operator to decide when to show complete button */}
          {!showCompletedReminders && 
          <button onClick={() => completeReminder(reminder.id)} className="my-button">Complete  ✅</button>}

          <button onClick={() => deleteReminder(reminder.id)} className="my-button">❌</button>

        </div>
      ))}
    </div>
  );
}

export default App;
