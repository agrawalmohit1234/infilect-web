import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import DeleteIcon from "@mui/icons-material/Delete";

import PDFDownloadComponent from "./PDFDownloadComponent";
import "./App.css";

function App() {
  const screenshotRef = useRef(null);
  const [img, setImg] = useState("");
  const [finalData, setFinalData] = useState({
    borderWidth: 200,
    borderHeight: 200,
    top: 32,
    bottom: 0,
    left: 20,
    right: 20,
  });
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [showBorder, setShowBorder] = useState(false);
  const [borderData, setBorderData] = useState({
    borderWidth: 200,
    borderHeight: 200,
    top: 32,
    bottom: 0,
    left: 20,
    right: 20,
  });

  function changeImage(input) {
    var reader;
    if (input.files && input.files[0]) {
      reader = new FileReader();
      reader.onload = function (e) {
        setImg(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const handleChangeImage = (e) => {
    changeImage(e.target);
  };

  const handleDeleteImage = () => {
    setImg("");
  };

  const handleWidth = (e) => {
    setWidth(e.target.value);
  };

  const handleHeight = (e) => {
    setHeight(e.target.value);
  };

  const handleShowBoundary = (e) => {
    if (e.target.checked) {
      setShowBorder(true);
    } else {
      setShowBorder(false);
    }
  };

  const handleFinalData = () => {
    setFinalData({ ...borderData });
  };

  const handleBorderChange = (e) => {
    setBorderData({ ...borderData, [e.target.id]: e.target.value });
  };

  const handleCaptureScreenshot = () => {
    if (screenshotRef.current) {
      html2canvas(screenshotRef.current).then((canvas) => {
        const screenshotDataUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = screenshotDataUrl;
        downloadLink.download = "infilect_screenshot.png";
        downloadLink.click();
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="imageContainer" ref={screenshotRef}>
          {img === "" && (
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleChangeImage}
            />
          )}
          {img !== "" && (
            <>
              <img
                src={img}
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                }}
              />
              <div
                style={
                  showBorder
                    ? {
                        width: `${borderData.borderWidth}px`,
                        height: `${borderData.borderHeight}px`,
                        border: `2px solid #f51c40`,
                        position: "absolute",
                        top: `${borderData.top}%`,
                        bottom: `${borderData.bottom}%`,
                        left: `${borderData.left}%`,
                        right: `${borderData.right}%`,
                      }
                    : null
                }
              ></div>
            </>
          )}
        </div>
        <div className="divider"></div>
        <div className="tools">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div className="toolHeading">Tools</div>
            <DeleteIcon
              onClick={handleDeleteImage}
              style={{ color: "red" }}
              className="delete"
            />
          </div>
          <div className="resizeHeading">Resize Image</div>
          <div
            style={{
              display: "flex",
            }}
          >
            <label className="label">Width</label>
            <input
              value={width}
              onChange={handleWidth}
              className="input"
              type="number"
            />
          </div>
          <div style={{ display: "flex", margin: "2px" }}>
            <label className="label">Height</label>
            <input
              value={height}
              onChange={handleHeight}
              className="input"
              type="number"
            />
          </div>
          <div style={{ display: "flex", margin: "2px", alignItems: "center" }}>
            <input
              type="checkbox"
              onChange={handleShowBoundary}
              className="check"
            />
            <label className="showBoundary">Show Boundary</label>
          </div>
          <div className="resizeHeading">Resize Boundary</div>
          <div style={{ display: "flex", margin: "2px" }}>
            <label className="label">Width</label>
            <input
              id="borderWidth"
              type="number"
              className="input"
              value={borderData.borderWidth}
              onChange={handleBorderChange}
            />
          </div>
          <div style={{ display: "flex", margin: "2px" }}>
            <label className="label">Height</label>
            <input
              id="borderHeight"
              type="number"
              className="input"
              value={borderData.borderHeight}
              onChange={handleBorderChange}
            />
          </div>
          <div style={{ display: "flex", margin: "2px" }}>
            <label className="label">Top</label>
            <input
              id="top"
              type="number"
              value={borderData.top}
              className="input"
              onChange={handleBorderChange}
            />
          </div>
          <div style={{ display: "flex", margin: "2px" }}>
            <label className="label">Left</label>
            <input
              id="left"
              type="number"
              value={borderData.left}
              className="input"
              onChange={handleBorderChange}
            />
          </div>
          <div style={{ display: "flex", margin: "2px" }}>
            <label className="label">Bottom</label>
            <input
              id="bottom"
              type="number"
              value={borderData.bottom}
              onChange={handleBorderChange}
              className="input"
            />
          </div>
          <div style={{ display: "flex", margin: "2px" }}>
            <label className="label">Right</label>
            <input
              id="right"
              type="number"
              value={borderData.right}
              onChange={handleBorderChange}
              className="input"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <button onClick={handleFinalData} className="saveBtn">
              Save
            </button>
            <PDFDownloadComponent data={finalData} />
          </div>

          <button onClick={handleCaptureScreenshot} className="submitBtn">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
