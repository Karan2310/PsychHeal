import React from 'react'

const Screen = () => {
    return (
        <div>
            Screen
            <button onClick={() => {
                localStorage.clear()
                window.location.reload()
            }}>Logout</button>
        </div>
    )
}

export default Screen