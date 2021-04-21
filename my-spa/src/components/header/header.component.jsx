import React from "react";

import "./header.styles.css";

const MainTitle = ({text}) => (
    <header className="main-title">
            <h1 className="main-title-text">{text}</h1>
    </header>
)

export default MainTitle;