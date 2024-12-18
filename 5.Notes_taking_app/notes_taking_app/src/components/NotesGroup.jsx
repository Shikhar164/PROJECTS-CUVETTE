import React from "react";
import "./NotesGroup.css";

function NotesGroup({ id, groupName, color, buttonColorId }) {
  const imageText = groupName.length;
  const NotesImage = {
    backgroundColor: `${color}`,
    borderRadius: "50%",
    minWidth: "61px",
    minHeight: "61px",

    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "1.50719rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "97.688%",
    letterSpacing: "0.03013rem",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    textTransform: "uppercase",
  };

  return (
    <>
      {buttonColorId === id ? (
        <div
          className='NotesGroup'
        >
          <div style={NotesImage}>
            {groupName[0]}
            {groupName[imageText - 1]}
          </div>
          <div className='notesName'>{groupName}</div>
        </div>
      ) : (
        <div className='NotesGroup'>
          <div style={NotesImage}>
            {groupName[0]}
            {groupName[imageText - 1]}
          </div>
          <div className='notesName'>{groupName}</div>
        </div>
      )}
    </>
  );
}

export default NotesGroup;
