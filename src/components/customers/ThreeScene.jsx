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
    const width = 1000;
    const height = 1000;

    // Initialize Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x0d1117); // Vulcan 900 background color
    mountRef.current.appendChild(renderer.domElement);

    // Add Bloom Effect for Atmosphere Glow
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 1.5;
    bloomPass.radius = 1;
    composer.addPass(bloomPass);

    // Create Sphere (Globe) with Teal Color
    const radius = 3;
    const sphereGeometry = new THREE.SphereGeometry(radius, 100, 100);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x008080, // Teal color for the globe
      roughness: 0.8,
      metalness: 0.2,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    // Add Fresnel Effect for Atmosphere Glow
    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.05, 100, 100);
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
    const ambientLight = new THREE.AmbientLight(0x282C34, 0.6);
    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight, pointLight);

    // Create a Group for Hexes
    const hexGroup = new THREE.Group();
    scene.add(hexGroup);

    // Set initial tilt for the globe
    const tiltAngle = 0.41; 
    hexGroup.rotation.x = tiltAngle;

    // D3 Projection and Path for GeoJSON
    const projection = geoEquirectangular().translate([0, 0]).scale(radius * 100);
    const path = geoPath().projection(projection);

    // Hexagon Radius and Geometry
    const hexRadius = 0.015;
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
              // Multi-polygon (nested arrays)
              region.forEach(polygon => {
                addHexesToPolygon(polygon);
              });
            } else {
              // Single polygon
              addHexesToPolygon(region);
            }
          });
        });
      });

    // Function to add hexes to each polygon region
    const addHexesToPolygon = (polygon) => {
      polygon.forEach(([lon, lat]) => {
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

        // Position hex and make it face outward
        hexMesh.position.set(xPos, yPos, zPos);
        hexMesh.lookAt(0, 0, 0);
        hexGroup.add(hexMesh);
      });
    };

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      hexGroup.rotation.y += 0.1;
      atmosphere.material.uniforms.viewVector.value = camera.position;
      composer.render();
    };
    animate();

    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="relative w-full h-full flex justify-center item-center" ref={mountRef} />;
};

export default GlobeWithHexCountries;
 