import React, { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import "./HomePage.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Notes from "./Notes";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [colorChoice, setColorChoice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [colorgroupChoice, setColorgroupChoice] = useState(false);

  const [userIdClicked, setUserIdClicked] = useState(0);

  const handleUserIdClicked = (IDnum) => {
    setUserIdClicked(IDnum);
  };

  const [createGroup, setCreateGroup] = useState({
    id: 0,
    groupName: "",
    color: "",
    create: false,
  });

  const { id, groupName, color, create } = createGroup;

  const submitCheck = () => {
    if (colorChoice === true && groupName !== "") {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = (open) => {
    setOpen(open);
  };

  const handleNotesChange = (e) => {
    setCreateGroup({ ...createGroup, groupName: e.target.value });
    setColorgroupChoice(true);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(submitCheck + "submitCheck");
    if (submitCheck() === true) {
      setCreateGroup({ ...createGroup, create: true });
      // {console.log(idChange())}
      setOpen(false);
    }
  };

  const funColor1 = () => {
    setCreateGroup({ ...createGroup, color: "#B38BFA" });
    setColorChoice(true);
  };

  const funColor2 = () => {
    setCreateGroup({ ...createGroup, color: "#FF79F2" });
    setColorChoice(true);
  };

  const funColor3 = () => {
    setCreateGroup({ ...createGroup, color: "#43E6FC" });
    setColorChoice(true);
  };

  const funColor4 = () => {
    setCreateGroup({ ...createGroup, color: "#F19576" });
    setColorChoice(true);
  };

  const funColor5 = () => {
    setCreateGroup({ ...createGroup, color: "#0047FF" });
    setColorChoice(true);
  };

  const funColor6 = () => {
    setCreateGroup({ ...createGroup, color: "#6691FF" });
    setColorChoice(true);
  };

  return (
    <>
      <div className="homePage">
        {/*  Desktop UI */}
        {submitCheck() ? (
          <div className="hideWhenMobile">
            <LeftSide
              handleClick={handleClick}
              handleUserIdClicked={handleUserIdClicked}
              id={id}
              groupName={groupName}
              color={color}
              create={create}
            />
          </div>
        ) : (
          <div className="hideWhenMobile">
            <LeftSide
              handleClick={handleClick}
              handleUserIdClicked={handleUserIdClicked}
            />
          </div>
        )}
        {userIdClicked > 0 ? (
          <div className="hideWhenMobile">
            <Notes userIdClicked={userIdClicked} />
          </div>
        ) : (
          <div className="hideWhenMobile">
            <RightSide />
          </div>
        )}
        {/* Mobile UI  */}
        {submitCheck() && isVisible ? (
          <div className="hideWhenPc">
            <LeftSide
              handleClick={handleClick}
              handleUserIdClicked={handleUserIdClicked}
              id={id}
              groupName={groupName}
              color={color}
              create={create}
            />
          </div>
        ) : isVisible ? (
          <div className="hideWhenPc" onClick={() => setIsVisible(false)}>
            <LeftSide
              handleClick={handleClick}
              handleUserIdClicked={handleUserIdClicked}
            />
            {console.log(isVisible)}
          </div>
        ) : null}
        {userIdClicked > 0 ? (
          <div className="hideWhenPc">
            <Notes userIdClicked={userIdClicked} />
          </div>
        ) : (
          open > 0 && (
            <div className="hideWhenPc">
              <LeftSide
                handleClick={handleClick}
                handleUserIdClicked={handleUserIdClicked}
                id={id}
                groupName={groupName}
                color={color}
                create={create}
              />
            </div>
          )
        )}
      </div>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          window.location.reload();
        }}
        closeOnOverlayClick={true}
        center={true}
        showCloseIcon={false}
      >
        <h2 className="Text1">Create New Notes group</h2>
        <form action="">
          <p>
            <label htmlFor="GroupName">
              <span className="Text2"> Group Name</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              <input
                type="text"
                placeholder="   Enter your group name...."
                className="placeHold"
                onChange={(e) => handleNotesChange(e)}
              />
              {colorgroupChoice === false && groupName === "" ? (
                <p style={{ color: "red" }}>Please Enter Group Name!</p>
              ) : null}
            </label>
          </p>
          <p className="Choosecolour">
            <label htmlFor="Choosecolour">
              <span className="Text2">Choose colour</span>
              <span className="ChoosecolourBreak">
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="colorButton1"
                  onClick={funColor1}
                ></button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="colorButton2"
                  onClick={funColor2}
                ></button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="colorButton3"
                  onClick={funColor3}
                ></button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="colorButton4"
                  onClick={funColor4}
                ></button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="colorButton5"
                  onClick={funColor5}
                ></button>
                &nbsp;&nbsp;
                <button
                  type="button"
                  className="colorButton6"
                  onClick={funColor6}
                ></button>
                &nbsp;&nbsp;
              </span>
            </label>
          </p>
          {colorChoice === false ? (
            <p style={{ color: "red" }}>Please Choose The Color!</p>
          ) : null}
          <input
            type="submit"
            value="Create"
            className="create"
            onClick={handleSubmit}
          />
        </form>
      </Modal>
    </>
  );
}

export default HomePage;
