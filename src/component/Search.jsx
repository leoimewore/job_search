import React from "react";

import Skills from "./Skills";
import list from "./List"

function Search(props) {

  //Click event to reset the interface
 
  const handleReset = function () {
    props.setInputValue([]);
    props.setInfo(list)
    
  };
//Map tp render filtered keywords to search bar
  return (
    (props.inputValue.length===0 ? null:
    <section className="search_container">
      <section className="search_item_container">
        {props.inputValue.map((item, i) => (
          <Skills
            skill={item}
            key={i}
            inputValue={props.inputValue}
            setInputValue={props.setInputValue}
            setInfo={props.setInfo}
            info={props.info}
          />
        ))}
      </section>

      <p className="reset" onClick={handleReset}>
        Clear
      </p>
    </section>)
  );
}

export default Search;
