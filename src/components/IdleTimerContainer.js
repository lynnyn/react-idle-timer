import React , {useRef, useState}  from 'react'
import IdleTimer from 'react-idle-timer'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function IdleTimerContainer() {
    const [isLoggedIn , setIsLoggedIn] = useState(true)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const idleTimerRef = useRef(null)
    const sessionTimeoutRef = useRef(null)

    const onIdle = () =>{
        console.log('user is idle')
        setModalIsOpen(true)
        sessionTimeoutRef.current = setTimeout(logOut, 5000)
    }

    const stayActive = () =>{
        setModalIsOpen(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('user is active')
    }

    const logOut = () =>{
        setModalIsOpen(false)
        setIsLoggedIn(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('user has logged out')
    }

    return (
        <div>
            {
                isLoggedIn ? <h2>Hello lynn</h2> : <h2>hello guest</h2>
            }
            <Modal isOpen = {modalIsOpen}>
                <h2>you've been idle for a while</h2>
                <button onClick = {logOut}>Log me out</button>
                <button onClick = {stayActive}>Keep me signed in</button>
            </Modal>
            <IdleTimer ref = {idleTimerRef} timeout = {5000} onIdle = {onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer
