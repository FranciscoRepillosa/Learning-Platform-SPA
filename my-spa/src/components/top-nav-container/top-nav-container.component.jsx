import React from "react";
import ProfileIcon from "../profile-icon/profile-icon.component";
import SearchBox from "../search-box/search-box.component";
import "./top-nav-container.styles.css";

const TopNavContainer = ({onSearchInputChange}) => (

        <div className="top-nav-container">
            <SearchBox onSearchInputChange={onSearchInputChange}/>
            <ProfileIcon />
        </div>
)

export default TopNavContainer;