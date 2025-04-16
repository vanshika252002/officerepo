import React, { useRef, useState, useEffect } from "react";

const DraggableWrapper = ({ children }) => {
  const wrapperRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const wrapper = wrapperRef.current;
      const x = e.clientX - parseInt(wrapper.dataset.mouseX);
      const y = e.clientY - parseInt(wrapper.dataset.mouseY);
      setPosition({ x, y });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e) => {
    setDragging(true);
    const wrapper = wrapperRef.current;
    wrapper.dataset.mouseX = e.clientX - wrapper.offsetLeft;
    wrapper.dataset.mouseY = e.clientY - wrapper.offsetTop;
  };

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "move",
        userSelect: "none",
        zIndex: 10000,
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWrapper;
