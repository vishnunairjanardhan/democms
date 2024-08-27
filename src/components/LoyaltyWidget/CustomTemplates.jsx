import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import "../../assets/brand/brand.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useColorContext, ColorProvider } from './OptionContext';
const CustomTemplates = ({handleNextStep,handlePrevStep}) => {
  const [color_1, setColor_1] = useState('#A4B0C8');
  const [color_2, setColor_2] = useState('#122C5F');
  const [ShowColor, setShowColor] = useState(false)
  const [ShowColor_1, setShowColor_1] = useState(false);
  const [previewcolor_1, setPreviewColor_1] = useState("bg-red");
  const [previewcolor_2, setPreviewColor_2] = useState("bg-blue");
  const [selected, setSeleted] = useState(true);
  const PreviewColor = (item) => {
    setPreviewColor_1(item.value[0]);
    updatePreviewColor_1(item.value[0]);
    setPreviewColor_2(item.value[1]);
    updatePreviewColor_2(item.value[1]);
    console.log(item.value[0])
  }

  const isColorLight = (hexColor) => {
    // Convert hex color to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Choose text color based on luminance
    return luminance > 0.5;
  }
  const isColor1Light = isColorLight(color_1);
  const isColor2Light = isColorLight(color_2);

  const Show_picker = () => {
    console.log("Show_picker...", !ShowColor, ShowColor)
    setShowColor(!ShowColor)
    setShowColor_1(false)
  }

  const Show_picker_1 = () => {
    console.log("Show_picker...", !ShowColor, ShowColor)
    setShowColor_1(!ShowColor_1)
    setShowColor(false)

  }

  const { updateSelected, updateColor_1, updateColor_2, updatePreviewColor_1, updatePreviewColor_2 } = useColorContext()

  const Custom = () => {
    setSeleted(true)
    updateSelected(true)
  }

  const Template = () => {
    setSeleted(false)
    updateSelected(false)
  }

  const PRESET_OPTIONS = [
    {
      // label: "",
      value: ["bg-red", "bg-blue"],
      leftChildClassName: "left_zero bg-red inner_container_1",
      rightChildClassName: "right_zero bg-blue inner_container_1"
    },
    {
      // label: "",
      value: ["bg-navy-blue", "bg-maroon"],
      leftChildClassName: "left_zero bg-navy-blue inner_container_1",
      rightChildClassName: "right_zero bg-maroon inner_container_1"
    },
    {
      // label: "",
      value: ["bg-bringle", "bg-skin"],
      leftChildClassName: "left_zero bg-bringle inner_container_1",
      rightChildClassName: "right_zero bg-skin inner_container_1"
    },
    {
      // label: "",
      value: ["bg-pista", "bg-yellow"],
      leftChildClassName: "left_zero bg-pista inner_container_1",
      rightChildClassName: "right_zero bg-yellow inner_container_1"
    },
    {
      // label: "",
      value: ["bg-dark-blue", "bg-white-smoke"],
      leftChildClassName: "left_zero bg-dark-blue inner_container_1",
      rightChildClassName: "right_zero bg-white-smoke inner_container_1"
    },
    {
      // label: "",
      value: ["bg-cream", "bg-olive-dark"],
      leftChildClassName: "left_zero bg-cream inner_container_1",
      rightChildClassName: "right_zero bg-olive-dark inner_container_1"
    },
  ]

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Select your brand colors</h1>
        <h4>
          Loyalty has to look good, too. Using your brand colors will make your program pop.
        </h4>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div>
            <input
              type="radio"
              id="html"
              name="fav_language"
              value="HTML"
              onClick={Template}
            />
            <label className='p-2' htmlFor="html">PICK THE COLORS THAT FIT YOUR BRAND</label>
          <div className="outer_container mb-5">
            {PRESET_OPTIONS.map((item, index) => (
              <div
                className="inner_container"
                key={index}
                onClick={() => {
                  PreviewColor(item);
                }}
              >
                <div className={item.leftChildClassName}></div>
                <div className={item.rightChildClassName}></div>
              </div>
            ))}
          </div>
          </div>

          <div className="pic_color">
            <input
              type="radio"
              id="css"
              name="fav_language"
              value="CSS"
              onClick={Custom}
            />
            <label className='p-2' htmlFor="css">CHOOSE YOUR OWN</label>
          </div>

          <div className="color-picker-parent mb-5">
            <div>
              <button
                className="picker-color"
                onClick={() => Show_picker_1()}
                style={{ backgroundColor: `${color_1}`,color: isColor1Light ? 'black' : 'white' }}
              >
                Click here
              </button>
              {ShowColor_1 && (
                <ChromePicker
                  color={color_1}
                  onChange={(updatedColor) => {
                    setColor_1(updatedColor.hex);
                    updateColor_1(updatedColor.hex);
                  }}
                />
              )}
            </div>

            <div>
              <button
                className="picker-color"
                onClick={() => Show_picker()}
                style={{ backgroundColor: `${color_2}`,color: isColor2Light ? 'black' : 'white' }}
              >
                Click here
              </button>
            </div>

            <div>
              {ShowColor && (
                <ChromePicker
                  color={color_2}
                  onChange={(updatedColor) => {
                    setColor_2(updatedColor.hex);
                    updateColor_2(updatedColor.hex);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="preview">
            <h2>Preview</h2>
            <div className="preview_child_1">
              <div
                className={previewcolor_2}
                style={{
                  backgroundColor: selected ? color_2 : '',
                  color: isColor2Light ? 'black' : 'white', 
                }}
              >
                <div
                  className={`outer_child_1 ${previewcolor_1}`}
                  style={{
                    backgroundColor: selected ? color_1 : '',
                    color: isColor1Light ? 'black' : 'white', 
                  }}
                ></div>
                <div
                  className={`outer_child_2 ${previewcolor_1}`}
                  style={{
                    backgroundColor: selected ? color_1 : '',
                    color: isColor1Light ? 'black' : 'white', 
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      marginTop: '15px',
                    }}
                  >
                    <div className="mini-square">
                      <div
                        className={`mini-circle ${previewcolor_2}`}
                        style={{
                          backgroundColor: selected ? color_2 : '',
                          color: isColor2Light ? 'black' : 'white', 
                        }}
                      ></div>
                    </div>
                    <div className="mini-square ">
                      <div
                        className={`mini-circle ${previewcolor_2}`}
                        style={{
                          backgroundColor: selected ? color_2 : '',
                          color: isColor2Light ? 'black' : 'white', 
                        }}
                      ></div>
                    </div>
                    <div className="mini-square ">
                      <div
                        className={`mini-circle ${previewcolor_2}`}
                        style={{
                          backgroundColor: selected ? color_2 : '',
                          color: isColor2Light ? 'black' : 'white', 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
      <button className="bg_color2 btn btn-primary m-3 mt-5 px-5" onClick={handlePrevStep}>
        Back
      </button>
      <button className="bg_color2 btn btn-primary m-3 mt-5 px-5" onClick={handleNextStep}>
        Next
      </button>
      </div>
    </div>
  );
};

export default CustomTemplates;
