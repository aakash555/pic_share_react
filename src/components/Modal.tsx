import Close from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react"
import "./styles/modal.css"

const Modal = (props: any) => {
  const [isVisible, setIsVisible] = useState(props.isVisible || true);

  useEffect(() => {
    setIsVisible(props.isVisible)
  }, [props.isVisible])

  return <div className={isVisible ? "modal-overlay" : "modal-overlay modal-hidden"}>
    <div className={props.className ? `modal ${props.className}` : "modal"} style={props.style || {}}>
      <div className="modal-header">
        <span className="modal-header-title">{typeof props.title === "string" ? props.title : React.cloneElement(props.title)}</span>
        <span className="modal-header-cancel-button" onClick={props.onCancel}><Close /></span>
      </div>
      <div className="modal-body">{props.children}</div>
      {
        props.footer ? <div className="modal-footer">{React.cloneElement(props.footer)}</div> : null
      }
    </div>
  </div>
}

export default Modal;