import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Card from "./component/Card"
import Search from "./component/Search";




function App() {
  const [info, setInfo] = useState([]);
  const [inputValue, setInputValue] = useState([]);

 
//Fetch data from json file 
  const getData = function () {
    fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setInfo(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //Convert Map Data and States to props for Cards and Search Bar 

  return (
    <main>
      <Search
        inputValue={inputValue}
        setInputValue={setInputValue}
        setInfo={setInfo}
        info={info}
        
        
      />

    
      {info.map((element) => (
        <Card
          key={element.id}
          imgUrl={element.logo}
          company={element.company}
          position={element.position}
          location={element.location}
          contract={element.contract}
          postedAt={element.postedAt}
          level={element.level}
          role={element.role}
          languages={element.languages.map((item) => item)}
          tools={element.tools}
          info={info}
          setInfo={setInfo}
          inputValue={inputValue}
          setInputValue={setInputValue}
          

        />
      ))}
      
    </main>
  );
}

export default App;
