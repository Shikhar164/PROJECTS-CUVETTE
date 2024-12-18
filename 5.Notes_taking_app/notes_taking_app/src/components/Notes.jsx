import React, { useState } from "react";
import "./Notes.css";
import enterArrow from "../images/enterArrow.png";
import backButton from '../images/backButton.png'

function Notes({ userIdClicked }) {
  const [saveNotes, setSaveNotes] = useState(false);
  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];
  const [myNotes, setMyNotes] = useState({
    id: [],
    notes: [],
    time: [],
    date: [],
  });

  const groupName = storedData[userIdClicked - 1].groupName;
  const color = storedData[userIdClicked - 1].color;

  const imageText = groupName.length;
  const NotesImage = {
    backgroundColor: `${color}`,
    borderRadius: "50%",
    minWidth: "61px",
    minHeight: "61px",

    maxWidth: "61px",
    maxHeight: "61px",
    // text
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "1.50719rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "97.688%" /* 1.47238rem */,
    letterSpacing: "0.03013rem",

    // center
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // UpperCase
    textTransform: "uppercase",
  };

  const myNotesFunction = (e) => {
    // Time
    const currentNotesDate = new Date();
    const noteTimeWithSeconds = currentNotesDate.toLocaleTimeString();
    let hours = currentNotesDate.getHours();
    const minutes = currentNotesDate.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // Format minutes to always show two digits
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const noteTimeWithoutSeconds = `${hours}:${formattedMinutes} ${amOrPm}`;

    // date
    const currentDate = new Date();
    const notesDay = currentDate.getDate();
    const notesMonth = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(currentDate);
    const notesYear = currentDate.getFullYear();

    const notesDate = `${notesDay} ${notesMonth} ${notesYear}`;

    // storing in state
    setMyNotes({
      ...myNotes,
      id: userIdClicked,
      notes: e.target.value,
      time: noteTimeWithoutSeconds,
      date: notesDate,
    });
    // setSaveNotes(true);
    // CHANGES START
    setSaveNotes(e.target.value.trim() !== ""); // Enable button if textarea is not empty
    // CHANGES END
  };
  const resetTextarea = () => {
    setMyNotes({ ...myNotes, notes: "" });
    // CHANGES START
    setSaveNotes(false); // Reset button state after saving
    // CHANGES END
  };
  const saveMyNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");
    let existingNotes = JSON.parse(existinggroupNamesData) || [];

    if (myNotes.notes !== "" && saveNotes === true) {
      existingNotes.push(myNotes);
      localStorage.setItem("myNotesSave", JSON.stringify(existingNotes));
    }
    resetTextarea();
  };

  const reterivingMyNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");

    if (existinggroupNamesData) {
      const existingNotes = JSON.parse(existinggroupNamesData);

      return existingNotes.map((note, index) =>
        userIdClicked === note.id ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "21px",
            }}
            key={index}
          >
            <div
              className="notes"
              style={{
                width: "65vw",
                height: "20vh",
                contentWrap: "break-word",
              }}
            >
              {" "}
              {note.notes}
              <div>
                <div className="timeAndDate">
                  <div className="date">{note.date} </div>
                  <div className="time">
                    <li>{note.time}</li>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        ) : null
      );
    } else {
      console.log("Data not found in localStorage");
    }
  };

  const handleKEnterKey = (e) => {
    if (e.key === "Enter" && saveNotes) {
      // CHANGES START
      e.preventDefault(); // Prevent default if button is disabled
      saveMyNotes();
      // CHANGES END
    }
  };

  return (
    <>
      {userIdClicked > 0 ? (
        <div className="NotesGroupNotes">
          <div className="NotesGroupHeading">
            &nbsp; &nbsp; &nbsp;
            <span
              className="backButton"
              onClick={() => window.location.reload()}
            >
              <img src={backButton} alt="BackButton" /> &nbsp;
            </span>
            <div style={NotesImage}>
              {groupName[0]}
              {groupName[imageText - 1]}
            </div>
            <div className="NotesName">{groupName}</div>
          </div>
          {/* <br/><br/><br/><br/> */}
          <div className="NotesContent">{reterivingMyNotes()}</div>
          <div className="NotesEnter">
            <textarea
              type="text"
              placeholder="Enter your text here..........."
              className="NotesInput"
              onChange={(e) => myNotesFunction(e)}
              value={myNotes.notes}
              onKeyDown={handleKEnterKey}
            />
            <img
              src={enterArrow}
              alt="Enter"
              className="NotesInputButton"
              onClick={saveMyNotes}
              style={{
                cursor: saveNotes ? "pointer" : "not-allowed", // CHANGES START
                opacity: saveNotes ? 1 : 0.3, // CHANGES END
              }}
            />
          </div>
        </div>
      ) : (
        ("no notes", console.log("no notes"))
      )}
    </>
  );
}

export default Notes;
