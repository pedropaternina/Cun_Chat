'use client'

import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'

type InfinityLoaderProps = {
    size?: number
    stroke?: number
    strokeLength?: number
    bgOpacity?: number
    speed?: number
    color?: string
}

export default function InfinityLoader({
    size = 55,
    stroke = 4,
    strokeLength = 0.15,
    bgOpacity = 0.1,
    speed = 1.3,
    color = 'black',
}: InfinityLoaderProps) {
    return (
        <Infinity
            size={size}
            stroke={stroke}
            strokeLength={strokeLength}
            bgOpacity={bgOpacity}
            speed={speed}
            color={color}
        />
    )
}
