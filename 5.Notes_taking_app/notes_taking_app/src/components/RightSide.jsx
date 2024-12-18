import React from "react";
import "./RightSide.css";
import rightSideImg from "../images/rightSideImg.png";
import lockImg from "../images/lock.png";

function RightSide() {
  return (
    <>
      <div className="rightSide">
        <div className="rightSideImg">
          <img src={rightSideImg} alt="rightSideImg" />
        </div>
        <div>
          <div className="line1">Pocket Notes</div>
          <div className="line2">
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </div>
        </div>
        <div className="line3">
          <img src={lockImg} alt="" /> end-to-end encrypted
        </div>
      </div>
    </>
  );
}

export default RightSide;
