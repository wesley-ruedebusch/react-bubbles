import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [id, setId] = useState("");

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    setId(color.id);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log("What is in e?", e);
    axiosWithAuth()
      .put(`/api/colors/${id}`, colorToEdit)
      .then(res => {
        console.log("This is from res", res);
        // Mutating array to display it on Bubble Page
        let colorsTemp = [...colors];
        let colorTemp = res.data;
        let count = 0;
        colors.find(colors => {
          count++;
          if (colors.id === id) {
            colorsTemp[count - 1] = colorTemp;
            updateColors(colorsTemp);
          }
        });
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`api/colors/${color.id}`)
      .then(res => {
        console.log(res);
        let colorsTemp = [...colors];
        colorsTemp.splice(colorsTemp.indexOf(color), 1);
        updateColors(colorsTemp);
      })
      .catch(err => console.log(err));
  };

  const changeHandler = event => {
    if (event.target.name == "code") {
      setColorToEdit({ ...colorToEdit, code: { hex: event.target.value } });
    } else {
      setColorToEdit({
        ...colorToEdit,
        [event.target.name]: event.target.value
      });
    }
  };
  const submitHandler = event => {
    event.preventDefault();
    axiosWithAuth()
      .post(`/api/colors`, colorToEdit)
      .then(res => {
        console.log(res);
        updateColors([...colors, colorToEdit]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {console.log("What is color here?", colors)}
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
