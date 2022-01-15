import React from 'react'

const ColoredButton = ({ color, func, className, style, stringColor }) => {

    if (style && stringColor === color) {
        return (
            <div className={className} onClick={() => func(color)} style={{ opacity: 1, color: color }} ></div>
        )
    }
    else if (color === 'grey') {
        return (
            <div className={className} onClick={func} style={{ opacity: .6, color: color }}></div>
        )
    }
    else {
        return (
            <div className={className} onClick={() => func(color)} style={{ opacity: .6, color: color }}></div>
        )
    }
}

export default ColoredButton