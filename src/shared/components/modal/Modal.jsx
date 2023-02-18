import { Component } from "react";
import { createPortal } from "react-dom";

import css from "./modal.module.scss";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component{

    componentDidMount() {
        document.addEventListener('keydown',  this.closeModal)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModal)
    }

    closeModal = ({target, currentTarget, code}) => {
        if (target === currentTarget || code === "Escape") {
            this.props.close();
        }
    }
    render() {
        const { children, close } = this.props;
        const { closeModal } = this;
        return createPortal(
          <div className={css.Overlay} onClick={closeModal}>
            <div className={css.Modal}>
              <span className={css.close} onClick={close}>
                X
              </span>
              {children}
            </div>
          </div>,
          modalRoot
        );
}
}

export default Modal;
