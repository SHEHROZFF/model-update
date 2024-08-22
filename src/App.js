"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { spiral } from "ldrs";

import "./../src/globals.css";
import Swatches from "./components/colorswatches";
import * as THREE from "three";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { SketchPicker } from "react-color";
import { Tooltip, Modal, Button, Form, Input } from "antd";
// Component Import
import { combineTextures } from "./combine_texture";
import { combinePattern } from "./combine_pattern";
import { combineSockcolor } from "./combine_color";
import { combineLogoChange } from "./comine_logo";
import Menu from "./components/menu";
// Component Import

// Sidebar Icons
import FitbitSharpIcon from "@mui/icons-material/FitbitSharp";
import DesignServicesSharpIcon from "@mui/icons-material/DesignServicesSharp";
import TextureSharpIcon from "@mui/icons-material/TextureSharp";
import PaletteSharpIcon from "@mui/icons-material/PaletteSharp";
import LocationSearchingSharpIcon from "@mui/icons-material/LocationSearchingSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// Sidebar Icons

const cuffColorSwatches = [
  "#401e72",
  "#29217d",
  "#081e2c",
  "#5f6468",
  "#003b49",
  "##003e66",
];
const heelColorSwatches = [
  "#401e72",
  "#29217d",
  "#081e2c",
  "#5f6468",
  "#003b49",
  "##003e66",
];
const toeColorSwatches = [
  "#401e72",
  "#29217d",
  "#081e2c",
  "#5f6468",
  "#003b49",
  "##003e66",
];
spiral.register();
export default function Home() {
  const [cuffColor, setCuffColor] = useState("#ffffff");
  const [heelColor, setHeelColor] = useState("#ffffff");
  const [dsockColor, setDsockColor] = useState("#ffffff");
  const [toeColor, setToeColor] = useState("#ffffff");
  const [texture, setTexture] = useState(null);
  const [logo, setLogo] = useState(null);
  const [defaultSockTexture, setDefaultSockTexture] = useState(null);
  const [pattern, setPattern] = useState(""); // Pattern state
  const [logoPlacement, setLogoPlacement] = useState("footbed");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/sockTexture.png", (texture) => {
      texture.encoding = THREE.sRGBEncoding;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      setDefaultSockTexture(texture);
    });
  }, []);

  const handleTextureChange = (event) => {
    const file = event.target.files[0];
    if (file && defaultSockTexture) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const newTexture = img;
          const mergedTexture = combineTextures(
            defaultSockTexture,
            newTexture,
            logo,
            logoPlacement
          );
          mergedTexture.encoding = THREE.sRGBEncoding;
          mergedTexture.minFilter = THREE.LinearFilter;
          mergedTexture.magFilter = THREE.LinearFilter;
          setTexture(mergedTexture);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          setLogo(null);
          setLogo(img);
          console.log(removeBackground(img));
          if (defaultSockTexture) {
            const updatedTexture = combineTextures(
              defaultSockTexture,
              texture?.image,
              img,
              logoPlacement
            );
            updatedTexture.encoding = THREE.sRGBEncoding;
            updatedTexture.minFilter = THREE.LinearFilter;
            updatedTexture.magFilter = THREE.LinearFilter;
            setTexture(updatedTexture);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePatternChange = (event) => {
    const newPattern = event.target.value;
    setPattern(newPattern);
    if (defaultSockTexture) {
      const updatedTexture = combinePattern(
        defaultSockTexture,
        logo,
        newPattern,
        logoPlacement
      );
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  };
  const handleColorOnChange = (color) => {
    setDsockColor(color);
    if (defaultSockTexture) {
      const updatedTexture = combineSockcolor(
        defaultSockTexture,
        logo,
        logoPlacement,
        color
      );
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  };
  {
    /* Modal to submit  */
  }
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
// Assuming texture is managed here
  const handleOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleSave = async () => {
    if (texture) {
      setLoading(true); // Show loader
      const canvas = document.createElement("canvas");
      canvas.width = texture.image.width;
      canvas.height = texture.image.height;
      const context = canvas.getContext("2d");
      context.drawImage(texture.image, 0, 0);

      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "customized_sock_texture.png");
        const username = "socksadmin";
        const password = "8jPu epUh nWyj gHAF Gjbx aqiV";

        const credentials = btoa(`${username}:${password}`);

        try {
          const response = await fetch(
            "https://socks.phpnode.net/wp-json/wp/v2/media",
            {
              method: "POST",
              headers: {
                Authorization: `Basic ${credentials}`,
              },
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            toast.success(`Upload successful! Image ID: ${data.id}`);
            handleSubmit(data.id); // Pass the image ID to the submit function
          } else {
            const errorData = await response.json();
            toast.error(
              `Upload failed: ${errorData.message || "Unknown error"}`
            );
            setLoading(false); // Hide loader
          }
        } catch (error) {
          toast.error("An error occurred during the upload.");
          setLoading(false); // Hide loader
        }
      }, "image/png");
    } else {
      toast.error("No texture available to upload.");
      setLoading(false); // Hide loader
    }
  };

  const handleSubmit = async (imageId) => {
    const data = {
      name,
      phone,
      email,
      sockDesign: parseInt(imageId, 10),
    };

    try {
      const response = await axios.post(
        "https://socks.phpnode.net/wp-json/socks/v1/order",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      toast.success("Data submitted successfully!");
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error submitting data.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setLoading(false); // Reset loader state when closing the modal
  };
  const handleLogoPlacement = (event) => {
    const newLogoPlacement = event.target.value;
    setLogoPlacement(newLogoPlacement);
    if (defaultSockTexture) {
      const updatedTexture = combineLogoChange(
        defaultSockTexture,
        logo,
        newLogoPlacement
      );
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  };

  const handleLogoDelete = () => {
    setLogo(null);

    if (defaultSockTexture) {
      // console.log(logoPlacement);
      const updatedTexture = combineLogoChange(
        defaultSockTexture,
        logo,
        "no_logo"
      );
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  };

  const removeBackground = (image) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // Get image data
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Loop through each pixel and make white pixels transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Assuming white background, you can adjust the threshold as needed
      if (r > 200 && g > 200 && b > 200) {
        data[i + 3] = 0; // Set alpha to 0 to make it transparent
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const newImg = new Image();
    newImg.src = canvas.toDataURL();
    return newImg;
  };

  // Modal Function Start //

  function Model({ cuffColor, heelColor, toeColor, texture }) {
    const { nodes, materials } = useGLTF("/SockModel.gltf");

    useEffect(() => {
      // Apply default textures
      const defaultCuffTexture = new THREE.TextureLoader().load(
        "/cuffTexture.png"
      );
      const defaultHeelTexture = new THREE.TextureLoader().load(
        "/cuffTexture.png"
      );
      const defaultToeTexture = new THREE.TextureLoader().load(
        "/cuffTexture.png"
      );

      materials.Cuff.map = defaultCuffTexture;
      materials.Cuff.needsUpdate = true;

      materials.Heel.map = defaultHeelTexture;
      materials.Heel.needsUpdate = true;

      materials.Toe.map = defaultToeTexture;
      materials.Toe.needsUpdate = true;

      // Apply sock texture
      materials.Sock_Texture.map = texture || defaultSockTexture;
      materials.Sock_Texture.needsUpdate = true;

      // Apply color changes
      materials.Cuff.color.set(cuffColor);
      materials.Cuff.needsUpdate = true;

      materials.Heel.color.set(heelColor);
      materials.Heel.needsUpdate = true;

      materials.Toe.color.set(toeColor);
      materials.Toe.needsUpdate = true;
    }, [
      cuffColor,
      heelColor,
      toeColor,
      dsockColor,
      texture,
      materials,
      defaultSockTexture,
    ]);

    return (
      <group dispose={null} position={[0, -0.15, 0]}>
        <mesh
          geometry={nodes.mesh005_3.geometry}
          material={materials.Cuff}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.mesh005.geometry}
          material={materials.Sock_Texture}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.mesh005_1.geometry}
          material={materials.Heel}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.mesh005_2.geometry}
          material={materials.Toe}
          castShadow
          receiveShadow
        />
      </group>
    );
  }

  // Modal Function End //

  const [open, setOpen] = useState(true);
  const [activeOptions, setActiveOptions] = useState([]);

  const handleOptionClick = (option) => {
    if (!activeOptions.includes(option)) {
      setActiveOptions([...activeOptions, option]);
    }
  };

  const handleDelete = (option) => {
    setActiveOptions(activeOptions.filter((opt) => opt !== option));
  };

  const scroll = (amount) => {
    const container = document.querySelector(".scroll-container");
    container?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const renderToolbarContent = (option) => {
    switch (option) {
      case "Upload Logo":
        return (
          <>
            <div className="flex flex-col items-start space-y-2 p-3 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-between items-center w-full">
                <label className="text-base font-medium text-gray-700">
                  Upload Logo:
                </label>
                {selectedImage && (
                  <Tooltip title="Delete Logo">
                    <ClearIcon
                      onClick={handleLogoDelete}
                      htmlColor="#E3262C"
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-xs text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
      file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white
      hover:file:bg-blue-700 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                onChange={handleLogoChange}
              />
              <p className="text-xs text-gray-500">PNG, JPG</p>

              {selectedImage && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-20 h-20 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </>
        );
      case "Upload Texture":
        return (
          <>
            <div className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg shadow-md overflow-hidden">
              <label className="text-base font-medium text-gray-700">
                Upload Texture:
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-xs text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
               file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white
               hover:file:bg-blue-700 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                onChange={handleTextureChange}
              />
              {selectedImage && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-20 h-20 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          </>
        );
      case "Choose Pattern":
        return (
          <>
            <h1 className="text-lg font-semibold text-gray-700 mb-2">
              Choose Pattern
            </h1>
            <div className="flex flex-col items-center space-y-2">
              <select
                value={pattern}
                onChange={handlePatternChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              >
                <option value="" className="text-gray-500">
                  None
                </option>
                <option value="dots">Dots</option>
                <option value="checkerboard">Checkerboard</option>
                <option value="illusionistic">Illusionistic</option>
                <option value="custom_1">cust-1</option>
                <option value="custom_2">cust-2</option>
                <option value="custom_3">cust-3</option>
                <option value="custom_4">cust-4</option>
              </select>
            </div>
          </>
        );
      case "Logo Placement":
        return (
          <>
            <h1 className="text-lg font-semibold text-gray-700 mb-2">
              Logo Placement:
            </h1>
            <div className="flex flex-col items-center space-y-2">
              <select
                value={logoPlacement}
                onChange={handleLogoPlacement}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              >
                <option value="calf" className="text-gray-700">
                  Calf
                </option>
                <option value="footbed" className="text-gray-700">
                  Footbed
                </option>
                <option value="calf_footbed" className="text-gray-700">
                  Calf + Footbed
                </option>
                <option value="repeating" className="text-gray-700">
                  Repeating
                </option>
              </select>
            </div>
          </>
        );
      case "Customize Color":
        return (
          <>
            <div className="p-6 rounded-lg shadow-lg flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Customize Color
              </h1>
              <div className="grid gap-6 grid-cols-4 ">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Cuff Color:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cuffColorSwatches.map((color) => (
                      <button
                        key={color}
                        style={{ backgroundColor: color }}
                        className={`w-10 h-10 rounded-full border-2 ${
                          cuffColor === color
                            ? "border-blue-500"
                            : "border-gray-300"
                        } transition-transform transform hover:scale-110`}
                        onClick={() => setCuffColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Heel Color:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {heelColorSwatches.map((color) => (
                      <button
                        key={color}
                        style={{ backgroundColor: color }}
                        className={`w-10 h-10 rounded-full border-2 ${
                          heelColor === color
                            ? "border-blue-500"
                            : "border-gray-300"
                        } transition-transform transform hover:scale-110`}
                        onClick={() => setHeelColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Sock Color:
                  </label>
                  <div className="flex flex-col items-center">
                    <Swatches onSelectColor={handleColorOnChange} />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Toe Color:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {toeColorSwatches.map((color) => (
                      <button
                        key={color}
                        style={{ backgroundColor: color }}
                        className={`w-10 h-10 rounded-full border-2 ${
                          toeColor === color
                            ? "border-blue-500"
                            : "border-gray-300"
                        } transition-transform transform hover:scale-110`}
                        onClick={() => setToeColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return <p>Unknown Option</p>;
    }
  };

  return (
    <div className="h-screen w-full flex">
      {/* Sidebar for large screens */}
      <div
        className={` sidebar border border-[#efeee8] shadow-xl duration-500 ${
          open ? "w-[18%]" : "w-[84px]"
        }`}
      >
        <div className="flex justify-normal items-center h-20 px-3 mb-8">
          <div>
            <button
              onClick={() => setOpen(!open)}
              className={`rounded-full duration-500 p-5 ${
                !open ? "rotate-180" : "rotate-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width={25}
                height={25}
                viewBox="0 0 50 50"
                fill="sidebarTEXT"
              >
                <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" />
              </svg>
            </button>
          </div>
          {open && (
            <img
              src="https://socks.phpnode.net/wp-content/uploads/2024/07/Logo3_vectorized-removebg-preview-e1722618835447.png"
              className="w-36"
              alt=""
            />
          )}
        </div>
        <div className="px-2 flex flex-col gap-y-3">
          <div className="px-2 flex flex-col gap-y-3">
            <div className="px-4 flex flex-col gap-y-10">
              <div
                className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1"
                onClick={() => handleOptionClick("Upload Logo")}
              >
                <FitbitSharpIcon htmlColor="#E3262C" />
                {open && <h1 className="text-sidebarTEXT">Upload Logo</h1>}
              </div>
              <div
                className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1"
                onClick={() => handleOptionClick("Upload Texture")}
              >
                <TextureSharpIcon htmlColor="#E3262C" />
                {open && <h1 className="text-sidebarTEXT">Upload Texture</h1>}
              </div>
              <div
                className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1"
                onClick={() => handleOptionClick("Choose Pattern")}
              >
                <DesignServicesSharpIcon htmlColor="#E3262C" />
                {open && <h1 className="text-sidebarTEXT">Choose Pattern</h1>}
              </div>
              <div
                className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1"
                onClick={() => handleOptionClick("Logo Placement")}
              >
                <PaletteSharpIcon htmlColor="#E3262C" />
                {open && <h1 className="text-sidebarTEXT">Logo Placement</h1>}
              </div>
              <div
                className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1"
                onClick={() => handleOptionClick("Customize Color")}
              >
                <LocationSearchingSharpIcon htmlColor="#E3262C" />
                {open && <h1 className="text-sidebarTEXT">Customize Color</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* sidebar for small screens */}
      <div className="absolute top-[550px] left-1/2 transform -translate-x-1/2 w-[84px] z-10 md:hidden">
        <div className="flex justify-center items-center h-20 px-3 mb-8">
          <div className="px-2 flex flex-row gap-y-3">
            <div className="px-2 flex flex-row gap-y-3 py-3 bg-red-100 rounded-lg w-[360px] overflow-x-auto">
              <Tooltip title="Upload Logo" placement="bottomRight">
                <div
                  className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-3"
                  onClick={() => handleOptionClick("Upload Logo")}
                >
                  <FitbitSharpIcon htmlColor="#E3262C" className="ml-2" />
                </div>
              </Tooltip>

              <Tooltip title="Upload Texture" placement="bottomRight">
                <div
                  className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-3"
                  onClick={() => handleOptionClick("Upload Texture")}
                >
                  <TextureSharpIcon htmlColor="#E3262C" className="ml-2" />
                </div>
              </Tooltip>

              <Tooltip title="Choose Pattern" placement="bottomRight">
                <div
                  className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-3"
                  onClick={() => handleOptionClick("Choose Pattern")}
                >
                  <DesignServicesSharpIcon
                    htmlColor="#E3262C"
                    className="ml-2"
                  />
                </div>
              </Tooltip>

              <Tooltip title="Logo Placement" placement="bottomRight">
                <div
                  className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-M3"
                  onClick={() => handleOptionClick("Logo Placement")}
                >
                  <PaletteSharpIcon htmlColor="#E3262C" className="ml-2" />
                </div>
              </Tooltip>

              <Tooltip title="Customize Color" placement="bottomRight">
                <div
                  className="py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-3"
                  onClick={() => handleOptionClick("Customize Color")}
                >
                  <LocationSearchingSharpIcon
                    htmlColor="#E3262C"
                    className="ml-2"
                  />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative w-full duration-500 ${
          open ? "w-[82%]" : "w-[100%]"
        }`}
      >
        <div className="absolute lg:-top-20 top-0 w-full h-full flex justify-center items-center">
          <div className="w-full h-1/2 md:h-full mb-80 lg:mb-0">
            <Canvas camera={{ position: [1, 0, 1], fov: 50 }} shadows>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <spotLight
                  intensity={0.9}
                  angle={0.6}
                  penumbra={0}
                  position={[0, 5, 2]}
                  castShadow
                  shadow-mapSize-width={2048}
                  shadow-mapSize-height={2048}
                />
                <Model
                  cuffColor={cuffColor}
                  heelColor={heelColor}
                  toeColor={toeColor}
                  texture={texture}
                />
                <mesh
                  receiveShadow
                  position={[0, -0.17, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <planeGeometry args={[5, 5]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  maxDistance={0.6}
                  minDistance={0.32}
                />
              </Suspense>
            </Canvas>
          </div>
          <div className="mt-6 flex gap-x-2 absolute top-0 right-2 lg:top-20 lg:right-2">
            <button
              onClick={handleOpenModal}
              className="px-8 py-3 md:px-4 md:py-1 text-sm lg:text-base bg-[#E3262C] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              Buy Now
            </button>
            <ToastContainer />

            <Modal
      title="Submit Your Order"
      visible={isModalVisible}
      onOk={handleSave}
      onCancel={handleCloseModal}
      okText="Upload and Submit" 
      okButtonProps={{
        style: { backgroundColor: 'rgba(227, 38, 44, 1)', borderColor: 'rgba(0, 0, 0, 0.25)'    }, // Set the button color to red
      }}
    >
      <Form onFinish={handleSubmit}>
        <Form.Item label="Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
      </Form>

      {loading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <l-spiral size="40" speed="0.9" color="black"></l-spiral>
        </div>
      )}
    </Modal>
            <a href="https://socks.phpnode.net/">
              <button className="px-8 py-3 md:px-4 md:py-1 text-sm lg:text-base bg-[#E3262C] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150 ease-in-out">
                Exit Editor
              </button>
            </a>
          </div>
        </div>
        <div className="w-full absolute bottom-0 left-0 border bg-white">
          <div className="flex overflow-x-auto scrollbar-hide scroll-container">
            {activeOptions.map((option) => (
              <>
                <div
                  key={option}
                  className="p-5 flex-shrink-0  h-full space-y-6 border rounded-lg bg-gray-100 shadow-md relative m-4"
                >
                  {renderToolbarContent(option)}
                  <button
                    onClick={() => handleDelete(option)}
                    className="absolute bottom-2 right-2 font-bold bg-red-300 p-2 rounded-md text-red-500 hover:text-red-800 hover:-translate-y-1 transition"
                  >
                    <DeleteSharpIcon />
                  </button>
                </div>
                <button
                  onClick={() => scroll(100)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 z-10"
                >
                  {">"}
                </button>
                <button
                  onClick={() => scroll(-100)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 z-10"
                >
                  {"<"}
                </button>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
