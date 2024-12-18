import React, { useState, useEffect } from "react";
import plusImage from "../images/+.png";
import "./LeftSide.css";
import NotesGroup from "./NotesGroup";

function LeftSide({
  handleClick,
  handleUserIdClicked,
  id,
  groupName,
  color,
  create,
}) {
  const [clickedButton, setClickedButton] = useState(null);
  const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];

  const newId =
    storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;

  const newData = {
    id: newId,
    groupName: groupName,
    color: color,
    create: create,
  };

  const submitCheck = () => {
    if (groupName !== "" && create === true) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (submitCheck()) {
      storedData.push(newData);
      localStorage.setItem("groupNamesData", JSON.stringify(storedData));
    }
  }, [groupName, create, newData]);

  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: clickedButton === buttonId ? "#2F2F2F2B" : "transparent",
      color: "black",
      minWidth: "100%",
      minHeight: "4rem",
      // border: "1px solid black",
      display: "flex",
      justifyContent: "flex-start",
      borderRadius: "1rem 1rem 1rem 1rem",
    };
  };

  return (
    <div className="leftSide">
      <h1>Pocket Notes</h1>
      <div className="center">
        <button className="plus" onClick={() => handleClick(true)}>
          <img className="plusImg" src={plusImage} alt="+" />
        </button>
        <div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {storedData.map((group) =>
              group.create ? (
                <div className='notesGroupSelected'>
                  
                  <span
                    className='act'
                    style={buttonStyle(group.id)}
                    onClick={(_) => {
                      handleUserIdClicked(group.id);
                      handleButtonClick(group.id);
                    }}
                  >
                    <NotesGroup
                      key={group.id}
                      groupName={group.groupName}
                      color={group.color}
                      buttonColorId={group.id}
                    />
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
