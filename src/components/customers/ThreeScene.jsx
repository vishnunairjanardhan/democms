import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { feature } from 'topojson-client';
import { geoEquirectangular, geoPath } from 'd3-geo';

const GlobeWithHexCountries = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const width = 800;
    const height = 800;

    // Initialize Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio); // Optimize for high DPI screens
    renderer.setClearColor(0x1a1c2c);
    mountRef.current.appendChild(renderer.domElement);

    // Bloom Effect for Atmosphere Glow
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.6, 0.3, 0.2); // Further optimized bloom settings
    composer.addPass(bloomPass);

    // Create Sphere (Globe) with Teal Color and lower geometry detail
    const radius = 3;
    const sphereGeometry = new THREE.SphereGeometry(radius, 50, 50); // Lowered segment count to 50x50
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x008080, // Teal color for the globe
      roughness: 0.8,
      metalness: 0.2,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    // Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.05, 50, 50);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        "c": { type: "f", value: 0.1 },
        "p": { type: "f", value: 2.5 },
        glowColor: { type: "c", value: new THREE.Color(0x4a90e2) },
        viewVector: { type: "v3", value: camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormView = normalize( viewVector - modelViewMatrix * vec4( position, 1.0 ) ).xyz;
          intensity = pow( c - dot(vNormal, vNormView), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          gl_FragColor = vec4( glowColor * intensity, 1.0 );
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0d1117, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight, pointLight);

    // Hex Group and Tilt
    const hexGroup = new THREE.Group();
    scene.add(hexGroup);
    const tiltAngle = 0.41; 
    hexGroup.rotation.x = tiltAngle;

    // D3 Projection and Path for GeoJSON
    const projection = geoEquirectangular().translate([0, 0]).scale(radius * 100);
    const path = geoPath().projection(projection);

    // Hexagon Radius and Geometry (Reduced hex radius)
    const hexRadius = 0.025;
    const hexGeometry = new THREE.CircleGeometry(hexRadius, 6);

    // Load GeoJSON Data for Countries
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then(worldData => {
        const countries = feature(worldData, worldData.objects.countries).features;
        countries.forEach(country => {
          const countryCoordinates = country.geometry.coordinates;
          countryCoordinates.forEach(region => {
            if (Array.isArray(region[0][0])) {
              region.forEach(polygon => addHexesToPolygon(polygon));
            } else {
              addHexesToPolygon(region);
            }
          });
        });
      });

    // Function to add hexes to each polygon region with reduced frequency
    const addHexesToPolygon = (polygon) => {
      polygon.forEach(([lon, lat], index) => {
        // Skip some hexes to reduce hex count
        if (index % 2 === 0) {
          const latRad = lat * (Math.PI / 180);
          const lonRad = -lon * (Math.PI / 180);
          const xPos = radius * Math.cos(latRad) * Math.cos(lonRad);
          const yPos = radius * Math.sin(latRad);
          const zPos = radius * Math.cos(latRad) * Math.sin(lonRad);
          const hexMaterial = new THREE.MeshBasicMaterial({
            color: 0xAA8FFF,
            side: THREE.DoubleSide,
            opacity: 0.8,
            transparent: true,
          });
          const hexMesh = new THREE.Mesh(hexGeometry, hexMaterial);

          hexMesh.position.set(xPos, yPos, zPos);
          hexMesh.lookAt(0, 0, 0);
          hexGroup.add(hexMesh);
        }
      });
    };

    // Animation Loop with Throttling
    let lastTime = 0;
    const animate = (time) => {
      if (time - lastTime > 30) { // Render every ~30ms
        hexGroup.rotation.y += 0.02;
        atmosphere.material.uniforms.viewVector.value = camera.position;
        composer.render();
        lastTime = time;
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="relative w-full h-full flex justify-center items-center" ref={mountRef} />;
};

export default GlobeWithHexCountries;
