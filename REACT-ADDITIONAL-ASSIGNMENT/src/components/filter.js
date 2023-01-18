import React, { useEffect, useState } from "react";
import axios from "axios"
import "./filter.css"
const FilterView = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState(false)
    const [text, setText] = useState("")
    const [filteredpost, setFilteredPost] = useState([])
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch((e) => {
            console.log(e.message)
        })
    }, [])
    const handleSearch = () => {
        setSearch(true)
        const filteredPosts = data.filter((data) =>
            data.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPost(filteredPosts);
        console.log(filteredpost)
    }
    const handleChange = (e) => {
        setText(e.target.value)
    }
    return (
        <>
        <h1>Blog Posts Search</h1>
          <div className="search-container">
            <input type={"text"} placeholder="Enter Text to Filter Posts" onChange={(e) => { handleChange(e) }} />
            <button onClick={handleSearch}>Search</button>
            </div>
            {!search && data.map((itms, idx) => (
                <div className="cards" key={idx}>
                    <h3>Title:{itms.title}</h3>
                    <p>{itms.body}</p>
                </div>
            ))}
            {search && filteredpost.map((itms, idx) => (
                <div className="cards" key={idx}>
                <h3>Title:{itms.title}</h3>
                <p>{itms.body}</p>
            </div>
            ))}
        </>
    )
}

export default FilterView;