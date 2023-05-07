import React, { useEffect, useState } from 'react'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import './topBtn.css'

export default function TopButton() {
    const [showTopBtn, setShowTopBtn] = useState(false)
    const [position, setPosition] = useState()
    
    const handleScroll = () => {
        window.scrollTo(0, 0);
    }
    
    useEffect(() => {
        const btn = document.querySelector('.scroll-top-btn')
        setShowTopBtn(false)
        btn.style.display = 'none'
    }, [])

    useEffect(() => {
        function updatePosition() {
            setPosition(window.scrollY)
        };
        const btn = document.querySelector('.scroll-top-btn')

        window.addEventListener('scroll', updatePosition);
        updatePosition();
        // condicional para mostrar de acordo com o valor mesmo que ele volte a 0 novamente 
        if (position >= 1500) {
            setShowTopBtn(true)
            btn.style.display = 'block'
        } else {
            setShowTopBtn(false)
            setTimeout(() => {
                btn.style.display = 'none'
            }, [200])
        }
        return () => window.removeEventListener('scroll', updatePosition);
    }, [position])

    return (
        <>
            {showTopBtn ?
                <BsFillArrowRightCircleFill
                    className='scroll-top-btn in-scroll-btn'
                    onClick={() => handleScroll()}
                /> : 
                <BsFillArrowRightCircleFill
                    className='scroll-top-btn out-scroll-btn'
                    onClick={() => handleScroll()}
                />
            }
        </>
    )
}
