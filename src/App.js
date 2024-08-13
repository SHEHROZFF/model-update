"use client";
import React, { useState, useEffect } from 'react';
// import Header from "@/components/Header/header";
// import SidebarMain from "@/components/Sidebar/sidebar";
// import ToolbarMain from "@/components/Toolbar/toolbar";
import "./../src/globals.css";
import * as THREE from 'three';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { SketchPicker } from 'react-color';
// Component Import
import { combineTextures } from './../src/combine_texture';
import { combinePattern } from './../src/combine_pattern';
import { combineSockcolor } from './../src/combine_color';
import { combineLogoChange } from './../src/comine_logo';


// Component Import




// Sidebar Icons
import FitbitSharpIcon from '@mui/icons-material/FitbitSharp';
import DesignServicesSharpIcon from '@mui/icons-material/DesignServicesSharp';
import TextureSharpIcon from '@mui/icons-material/TextureSharp';
import PaletteSharpIcon from '@mui/icons-material/PaletteSharp';
import LocationSearchingSharpIcon from '@mui/icons-material/LocationSearchingSharp';
// Sidebar Icons

// Sidebar Icons
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

// Sidebar Icons


export default function Home() {
  const [cuffColor, setCuffColor] = useState('#ffffff');
  const [heelColor, setHeelColor] = useState('#ffffff');
  const [dsockColor, setdsockColor] = useState('#ffffff');
  const [toeColor, setToeColor] = useState('#ffffff');
  const [texture, setTexture] = useState(null);
  const [logo, setLogo] = useState(null);
  // const [logotype, setLogotype] = useState(null);
  const [defaultSockTexture, setDefaultSockTexture] = useState(null);
  const [pattern, setPattern] = useState(''); // Pattern state
  const [logoPlacement, setLogoPlacement] = useState('footbed');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Load the default sock texture
    const loader = new THREE.TextureLoader();
    loader.load('/sockTexture.png', (texture) => {
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
          const mergedTexture = combineTextures(defaultSockTexture, newTexture, logo, logoPlacement);
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
          setLogo(null)
          setLogo(img);
          console.log(removeBackground(img));
          if (defaultSockTexture) {
            const updatedTexture = combineTextures(defaultSockTexture, texture?.image, img, logoPlacement);
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
      console.log(logoPlacement);
      const updatedTexture = combinePattern(defaultSockTexture, logo, newPattern, logoPlacement);
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  };
  const handleColorOnChange = (event) => {
    const newcolor = event.target.value;
    setdsockColor(newcolor);
    if (defaultSockTexture) {
      console.log(logoPlacement);
      const updatedTexture = combineSockcolor(defaultSockTexture, logo, logoPlacement, newcolor);
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  };
  const handleSave = () => {
    if (texture) {
      const link = document.createElement('a');
      link.href = texture.image.toDataURL('image/png');
      link.download = 'customized_sock_texture.png';
      link.click();
    }
  };

  const handleLogoPlacement = (event) => {
    const newLogoPlacement = event.target.value;
    setLogoPlacement(newLogoPlacement);
    if (defaultSockTexture) {
      // console.log(logoPlacement);
      const updatedTexture = combineLogoChange(defaultSockTexture, logo, newLogoPlacement);
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  }

  const handleLogoDelete = () => {
    setLogo(null)

    if (defaultSockTexture) {
      // console.log(logoPlacement);
      const updatedTexture = combineLogoChange(defaultSockTexture, logo, 'no_logo');
      updatedTexture.encoding = THREE.sRGBEncoding;
      updatedTexture.minFilter = THREE.LinearFilter;
      updatedTexture.magFilter = THREE.LinearFilter;
      setTexture(updatedTexture);
    }
  }

  const removeBackground = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

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
    const { nodes, materials } = useGLTF('/SockModel.gltf');

    useEffect(() => {
      // Apply default textures
      const defaultCuffTexture = new THREE.TextureLoader().load('/cuffTexture.png');
      const defaultHeelTexture = new THREE.TextureLoader().load('/cuffTexture.png');
      const defaultToeTexture = new THREE.TextureLoader().load('/cuffTexture.png');

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


    }, [cuffColor, heelColor, toeColor, dsockColor, texture, materials, defaultSockTexture]);

    return (
      <group dispose={null} position={[0, -0.15, 0]}>
        <mesh geometry={nodes.mesh005_3.geometry} material={materials.Cuff} castShadow receiveShadow />
        <mesh geometry={nodes.mesh005.geometry} material={materials.Sock_Texture} castShadow receiveShadow />
        <mesh geometry={nodes.mesh005_1.geometry} material={materials.Heel} castShadow receiveShadow />
        <mesh geometry={nodes.mesh005_2.geometry} material={materials.Toe} castShadow receiveShadow />
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
    const container = document.querySelector('.scroll-container');
    container?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const renderToolbarContent = (option) => {
    switch (option) {
      case 'Upload Logo':
        return (
          <>
            <div className='flex flex-col items-center space-y-2 p-3 bg-white rounded-lg shadow-md overflow-hidden'>
              <label className='text-base font-medium text-gray-700'>
                Upload Logo:
              </label>
              <input
                type="file"
                accept="image/*"
                className='block w-full text-xs text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
               file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white
               hover:file:bg-blue-700 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105'
                onChange={handleLogoChange}
              />
              <p className='text-xs text-gray-500'>
                PNG, JPG
              </p>

              {selectedImage && (
                <div className='mt-2 flex justify-center'>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className='w-20 h-20 object-cover rounded-lg shadow-lg'
                  />
                </div>
              )}
            </div>

          </>
        );
      case 'Upload Texture':
        return (
          <>
            <div className='flex flex-col items-center space-y-2 p-3 bg-white rounded-lg shadow-md overflow-hidden'>
              <label className='text-base font-medium text-gray-700'>
                Upload Texture:
              </label>
              <input
                type="file"
                accept="image/*"
                className='block w-full text-xs text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none
               file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white
               hover:file:bg-blue-700 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105'
                onChange={handleTextureChange}
              />
              {selectedImage && (
                <div className='mt-2 flex justify-center'>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className='w-20 h-20 object-cover rounded-lg shadow-lg'
                  />
                </div>
              )}
            </div>
          </>
        );
      case 'Choose Pattern':
        return (
          <>
            <h1 className='text-lg font-semibold text-gray-700 mb-2'>Choose Pattern</h1>
            <div className='flex flex-col items-center space-y-2'>
              <select
                value={pattern}
                onChange={handlePatternChange}
                className='block w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
              >
                <option value="" className='text-gray-500'>None</option>
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
      case 'Logo Placement':
        return (
          <>
            <h1 className='text-lg font-semibold text-gray-700 mb-2'>Logo Placement:</h1>
            <div className='flex flex-col items-center space-y-2'>
              <select
                value={logoPlacement}
                onChange={handleLogoPlacement}
                className='block w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out'
              >
                <option value="calf" className='text-gray-700'>Calf</option>
                <option value="footbed" className='text-gray-700'>Footbed</option>
                <option value="calf_footbed" className='text-gray-700'>Calf + Footbed</option>
                <option value="repeating" className='text-gray-700'>Repeating</option>
              </select>
            </div>

          </>
        );
      case 'Customize Color':
        return (
          <>
            <h1 className='text-lg font-semibold text-gray-800 mb-4'>Customize Color</h1>
            <div className='flex flex-col items-center space-y-6 p-4 bg-white rounded-lg shadow-md'>
              <div className='w-full'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Cuff Color:</label>
                <SketchPicker
                  color={cuffColor}
                  onChangeComplete={(color) => setCuffColor(color.hex)}
                  className='rounded-md shadow-lg'
                />
              </div>

              <div className='w-full'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Heel Color:</label>
                <SketchPicker
                  color={heelColor}
                  onChangeComplete={(color) => setHeelColor(color.hex)}
                  className='rounded-md shadow-lg'
                />
              </div>

              <div className='w-full'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Sock Color:</label>
                <input
                  type="color"
                  value={dsockColor}
                  onChange={handleColorOnChange}
                  title="Choose a color"
                  className='block w-full h-10 cursor-pointer rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out'
                />
              </div>

              <div className='w-full'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Toe Color:</label>
                <SketchPicker
                  color={toeColor}
                  onChangeComplete={(color) => setToeColor(color.hex)}
                  className='rounded-md shadow-lg'
                />
              </div>

              <button
                onClick={handleSave}
                className='mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out'
              >
                Save Customized PNG
              </button>
            </div>

          </>
        );
      default:
        return <p>Unknown Option</p>;
    }
  };


  return (
    <div className="h-screen w-full flex">
      <div className={`border border-[#efeee8] shadow-xl duration-500 ${open ? "w-[18%]" : "w-[84px]"}`}>
        <div className="flex justify-normal items-center h-20 px-3 mb-8">
          <div>
            <button
              onClick={() => setOpen(!open)}
              className={`rounded-full duration-500 p-5 ${!open ? "rotate-180" : "rotate-0"}`}
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
          <svg
            width={open ? 100 : 60}
            height={open ? 100 : 60}
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z" /><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z" />
          </svg>
        </div>
        <div className="px-2 flex flex-col gap-y-3">
          <div className="px-2 flex flex-col gap-y-3">
            <div className='px-4 flex flex-col gap-y-10'>
              <div
                className='py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1'
                onClick={() => handleOptionClick('Upload Logo')}
              >
                <FitbitSharpIcon htmlColor='#273c75' />
                {open && <h1 className='text-sidebarTEXT'>Upload Logo</h1>}
              </div>
              <div
                className='py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1'
                onClick={() => handleOptionClick('Upload Texture')}
              >
                <TextureSharpIcon htmlColor='#273c75' />
                {open && <h1 className='text-sidebarTEXT'>Upload Texture</h1>}
              </div>
              <div
                className='py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1'
                onClick={() => handleOptionClick('Choose Pattern')}
              >
                <DesignServicesSharpIcon htmlColor='#273c75' />
                {open && <h1 className='text-sidebarTEXT'>Choose Pattern</h1>}
              </div>
              <div
                className='py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1'
                onClick={() => handleOptionClick('Logo Placement')}
              >
                <PaletteSharpIcon htmlColor='#273c75' />
                {open && <h1 className='text-sidebarTEXT'>Logo Placement</h1>}
              </div>
              <div
                className='py-3 flex gap-x-4 cursor-pointer hover:bg-blue-50 rounded-lg w-full p-1'
                onClick={() => handleOptionClick('Customize Color')}
              >
                <LocationSearchingSharpIcon htmlColor='#273c75' />
                {open && <h1 className='text-sidebarTEXT'>Customize Color</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`relative w-full duration-500 ${open ? "w-[82%]" : "w-[100%]"}`}>
        <div className="absolute top-0 w-full h-full flex justify-center items-center">
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
              <Model cuffColor={cuffColor} heelColor={heelColor} toeColor={toeColor} texture={texture} />
              <mesh receiveShadow position={[0, -0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
        <div className="w-full absolute bottom-0 left-0 border bg-white">
          <div className="flex overflow-x-auto h-56 scrollbar-hide scroll-container">
            {activeOptions.map((option) => (
              <><div
                key={option}
                className='p-5 flex-shrink-0 w-1/5 h-48 space-y-6 border rounded-lg bg-gray-100 shadow-md relative m-4'
              >
                {renderToolbarContent(option)}
                <button
                  onClick={() => handleDelete(option)}
                  className='absolute bottom-2 right-2 font-bold bg-red-300 p-2 rounded-md text-red-500 hover:text-red-800 hover:-translate-y-1 transition'
                >
                  <DeleteSharpIcon />
                </button>

              </div><button
                onClick={() => scroll(100)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 z-10"
              >
                  {'>'}
                </button><button
                  onClick={() => scroll(-100)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 z-10"
                >
                  {'<'}
                </button></>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
