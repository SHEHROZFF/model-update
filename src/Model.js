// function Model({ cuffColor, heelColor, toeColor, texture }) {
//   const { nodes, materials } = useGLTF("/SockModel.gltf");

//   useEffect(() => {
//     // Apply default textures
//     const defaultCuffTexture = new THREE.TextureLoader().load(
//       "/cuffTexture.png"
//       // ,(defaultCuffTexture) => {
//       //   defaultCuffTexture.encoding = THREE.sRGBEncoding;
//       //   defaultCuffTexture.minFilter = THREE.LinearFilter;
//       //   defaultCuffTexture.magFilter = THREE.LinearFilter;
//       // }
//     );
//     const defaultHeelTexture = new THREE.TextureLoader().load(
//       "/cuffTexture.png"
//       // ,(defaultHeelTexture) => {
//       //   defaultHeelTexture.encoding = THREE.sRGBEncoding;
//       //   // texture.minFilter = THREE.LinearFilter;
//       //   defaultHeelTexture.magFilter = THREE.LinearFilter;
//       //   }
//     );
//     const defaultToeTexture = new THREE.TextureLoader().load(
//       "/cuffTexture.png"
//       // ,(defaultToeTexture) => {
//       //   defaultToeTexture.encoding = THREE.sRGBEncoding;
//       //   // texture.minFilter = THREE.LinearFilter;
//       //   defaultToeTexture.magFilter = THREE.LinearFilter;
//       //   }

//     );

//     materials.Cuff.map = defaultCuffTexture;
//     materials.Cuff.needsUpdate = true;

//     materials.Heel.map = defaultHeelTexture;
//     materials.Heel.needsUpdate = true;

//     materials.Toe.map = defaultToeTexture;
//     materials.Toe.needsUpdate = true;

//     materials.Sock_Texture.map = texture || defaultSockTexture;
//     materials.Sock_Texture.needsUpdate = true;

//     materials.Cuff.color.set(cuffColor);
//     materials.Cuff.needsUpdate = true;

//     materials.Heel.color.set(heelColor);
//     materials.Heel.needsUpdate = true;

//     materials.Toe.color.set(toeColor);
//     materials.Toe.needsUpdate = true;
//   }, [
//     cuffColor,
//     heelColor,
//     toeColor,
//     dsockColor,
//     texture,
//     materials,
//     defaultSockTexture,
//   ]);

//   return (
//     <group dispose={null} position={[0, -0.15, 0]}>
//       <mesh
//         geometry={nodes.mesh005_3.geometry}
//         material={materials.Cuff}
//         castShadow
//         receiveShadow
//       />
//       <mesh
//         geometry={nodes.mesh005.geometry}
//         material={materials.Sock_Texture}
//         castShadow
//         receiveShadow
//       />
//       <mesh
//         geometry={nodes.mesh005_1.geometry}
//         material={materials.Heel}
//         castShadow
//         receiveShadow
//       />
//       <mesh
//         geometry={nodes.mesh005_2.geometry}
//         material={materials.Toe}
//         castShadow
//         receiveShadow
//       />
//     </group>
//   );
// }