import React, { Component } from 'react';
import './myProfile.css';

export default class MyProfile extends Component {
    state = {
        selectedImage: "img/annie.jpeg",
        matched: [],
        turn: 0
    };

    render() {

        return (
            <div>
                <div className="header">
                    <h1>My profile</h1>
                </div>
                <input type="file" accept="image/*" id="selectImage" onChange={this.setSelectedImage}/>
                <img src="img/annie.jpeg" id="outImage" onClick={this.clickSelectImage}/>
            </div>
        )
    }

    clickSelectImage = () => {
        document.getElementById("selectImage").click();
    };

    setSelectedImage = () => {
        let files = document.getElementById("selectImage").files[0];

        if (files) {
            let fr = new FileReader();
            fr.onload = function () {
                console.log("hej");
                document.getElementById("outImage").src = fr.result;
            };
            fr.readAsDataURL(document.getElementById("selectImage").files[0]);
        }
    };
}


