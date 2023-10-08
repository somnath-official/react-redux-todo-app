import { ReactElement, ReactPortal, useEffect, useRef } from 'react'
import './Modal.css'

type ReactChild = ReactElement | string | number;

type ReactNode = ReactChild | ReactPortal | boolean | null | undefined

export interface ModalProps {
  show: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ show, onClose, children }: ModalProps) => {
  const modal = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (show) shwoModal()
    else closeModal()
    window.addEventListener("click", windowOnClick)
  })

  function shwoModal() {
    modal.current?.classList.add("show-modal")
  }

  function closeModal() {
    modal.current?.classList.remove("show-modal")
    onClose()
  }

  function windowOnClick(event: MouseEvent) {
    if (event.target === modal.current) closeModal()
  }

  return (
    <div className="modal" ref={modal}>
      <div className="modal-content">
        { children }
      </div>
  </div>
  )
}

export default Modal