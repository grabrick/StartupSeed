import { useState } from "react";
import m from "./PostSelector.module.css";
import arrowDown from '../../../../assets/images/arrow-down.svg'
import arrowUp from '../../../../assets/images/arrow-up.svg'

function PostSelector({setSearchInput, searchInput}) {
  const [isActive, setIsActive] = useState(false);

  const defaultValue = ["Любой", "Junior", "Middle", "Senior", "Lead"];
  const filtered = defaultValue.filter(items => items !== searchInput.postLevel)


  const handleClick = (value) => {  
    setIsActive(!isActive)
    setSearchInput({input: searchInput.input, postLevel: value})
  };

  return (
    <div className={isActive === true ? m.acitveContainer : m.container}>
      <input className={m.input} type="hidden" />
      <div className={m.selectHead} onClick={() => setIsActive(!isActive)}>
        <p className={m.text}>{searchInput.postLevel === "Любой" ? "Любой" : searchInput.postLevel}</p>
        <img src={isActive === true ? arrowUp : arrowDown} alt="" />
      </div>
      <ul className={isActive === true ? m.selectList : m.notActive}>
        <div className={m.selectListWrapper}>
          {filtered.map((items) => (
            <button className={m.listItem} disabled={''} onClick={() => handleClick(items)}>
              {items}
            </button>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default PostSelector;
