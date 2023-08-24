import React from "react";

import "./search-box.styles.css";

const axios = require('axios').default;

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.searchByInputValue = this.searchByInputValue.bind(this)
    }

    searchByInputValue(e) {
        if (e.keyCode === 13) {
            const inputValue = document.getElementById("searchBox").value;
            axios({
                method: 'get',
                withCredentials: true,
                url: `http://localhost:2121/courses?searchInput=${inputValue}`,
              })
                .then(response => {
                    this.props.onSearchInputChange(response.data.data.courses)
                });
        }
    }

    render() {
        return (
            <input id="searchBox" onKeyUp={this.searchByInputValue } className="search-box" type="text" placeholder="search courses">{console.log("SearchBox")}</input>
        )
    }

 
}

export default SearchBox;
