import React from "react";


function Card(props) {

  //Use spread operator to create a new array for the search keywords on all Cards
  let arr = [props.role, props.level, ...props.languages, ...props.tools];


  //Control click event to select and store keywords

  const handleClick = function (event) {
    const clickedSkill = event.target.textContent;
    if(!props.inputValue.includes(clickedSkill)){
    props.setInputValue([...props.inputValue, clickedSkill]);
}

    const filteredData = props.info.filter((ev) =>
      [ev.role, ev.level, ...ev.languages, ...ev.tools].includes(clickedSkill)
    );
    props.setInfo(filteredData);
  }

 

  
  


  return (
    <section className="card">
      <div className="avatar">
        <img src={props.imgUrl} alt="avatar" />
      </div>
      <section className="card_info">
        <p className="card_info_flex_item">{props.company}</p>
        <p className="card_info_flex_item">New!</p>
        <p className="card_info_flex_item">Featured</p>
        <h2>{props.position}</h2>
        <ul>
          <li className="">{props.postedAt}</li>
          <li className="">{props.contract}</li>
          <li className="">{props.location}</li>
        </ul>
      </section>
      <section className="dev_stacks">
        {arr.map(function (item, i) {
          return (
            <p onClick={handleClick} className="stack" key={`${i}`}>
              {item}
            </p>
          );
        })}
      </section>
    </section>
  );
}

export default Card;