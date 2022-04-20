import React, { useCallback, useEffect, useState } from 'react'
import DialogContent from "../Components/DialogContent";
import CloseIcon from '@mui/icons-material/Close';
const ModalContext = React.createContext()

const Modal = ({ modal, unSetModal }) => {
    useEffect(() => {
        const bind = e => {
            if (e.keyCode !== 27) {
                return
            }

            if (document.activeElement && ['INPUT', 'SELECT'].includes(document.activeElement.tagName)) {
                return
            }

            unSetModal()
        }

        document.addEventListener('keyup', bind)
        return () => document.removeEventListener('keyup', bind)
    }, [modal, unSetModal])

    return (
        <div className="modal">
            <button className="modal__close" onClick={unSetModal} />
            <div className="modal__inner">
                <button className="modal__close-btn" onClick={unSetModal}>
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                    <CloseIcon/>
                    </svg>
                </button>
                <DialogContent employed={modal} unSetModal={unSetModal}/>
            </div>
        </div>
    )
}

const ModalProvider = props => {
    const [modal, setModal] = useState()
    const unSetModal = useCallback(() => {
        setModal()
    }, [setModal])

    return (
        <ModalContext.Provider value={{ unSetModal, setModal }} {...props} >
            {props.children}
            {modal && <Modal modal={modal} unSetModal={unSetModal} />}
        </ModalContext.Provider>
    )
}

const useModal = () => {
    const context = React.useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a UserProvider')
    }

    return context
}

export { ModalProvider, useModal }
