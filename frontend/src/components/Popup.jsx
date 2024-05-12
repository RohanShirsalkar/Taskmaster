import React, { useEffect, useState } from 'react'

export default function Popup({ type, message }) {
    const [color, setColor] = useState("white");

    useEffect(() => {
        switch (type) {
            case "success":
                setColor("green")
                console.log("typr", type);
                break;
            case "danger":
                setColor("red")
                break;

            default:
                setColor("white")
                break;
        }
    }, [message]);

    return (
        <div className='popup-card' style={{ backgroundColor: color }}>
            {message}
        </div>
    )
}
