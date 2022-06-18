import React from "react";
import list from "./List";

import { default as logo1 } from "./icon-remove.svg";

function Skills(props) {


  //Delete individual skills from the search bar
  const handleDelete = function (event) {
    const newKeyWords = props.inputValue.filter((key) => key !== props.skill);
    props.setInputValue(newKeyWords);
    if (newKeyWords) {
      let newData = list.filter((element) => {
        return newKeyWords.every((item) => {
          return (
            element.role === item ||
            element.tools.includes(item) ||
            element.level === item ||
            element.languages.includes(item)
          );
        });
      });

      console.log(newData);

      props.setInfo(newData);
    } else {
      props.setInfo(list);
    }
  };

  return (
    <section className="search_item">
      <div className="item">{props.skill}</div>
      <div className="icon_wrapper" onClick={handleDelete}>
        <img src={logo1} />
      </div>
    </section>
  );
}

export default Skills;
