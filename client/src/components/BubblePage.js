import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {
    axiosWithAuth().get(`/api/colors`)
    .then(res => {
      console.log(res);
      setColorList(res.data)
    })
    .catch(err => console.log(err))
  }, [setColorList])

  const updateList = () => {
    setUpdate(!update);
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        update={updateList}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
