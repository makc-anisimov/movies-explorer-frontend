import React from 'react'
export default function Preloader({ isShowPreloader }) {
    return (
        <div className={`preloader ${!isShowPreloader && 'preloader_invisible'}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

// export default Preloader
