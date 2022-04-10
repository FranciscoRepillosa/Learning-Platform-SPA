import React, {useRef, useEffect} from "react";
import "./profile-icon.styles.css"

const ProfileIcon = ({onInputChange}) => {
    
    let login = localStorage.getItem('authorization');

    const profileIconRef = useRef("");

    useEffect(() => {
        const accessKey = localStorage.getItem('authorization');
        fetch("http://localhost:4321/media/userimage", {
        headers: {
            "Authorization": accessKey
        }
    })
    .then(courseImg => {
        console.log(courseImg);
        return courseImg.blob();
    })
    .then(img => {
        console.log(img);
        console.log(profileIconRef.current)
                profileIconRef.current.src = URL.createObjectURL(img);
        });
    })

    return (
            <>
                <img ref={profileIconRef} className="profile-icon " src="user.svg" alt=""/>
            </>
    )
    

        
}

export default ProfileIcon;