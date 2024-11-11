// src/components/GlobeWithHexCountries.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import { geoEquirectangular, geoPath } from 'd3-geo';

const GlobeWithHexCountries = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Initialize Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x0d1117); // Vulcan-800 color background
    mountRef.current.appendChild(renderer.domElement);

    // Create Sphere (Globe)
    const radius = 3;
    const sphereGeometry = new THREE.SphereGeometry(radius, 100, 100);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0D1117,
      emissive: 0x24292F,
      shininess: 10,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x282C34, 1.5);
    const pointLight = new THREE.PointLight(0x333333, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    // Create a Group for Hexes
    const hexGroup = new THREE.Group();
    scene.add(hexGroup);

    // D3 Projection and Path for GeoJSON
    const projection = geoEquirectangular().translate([0, 0]).scale(radius * 100);
    const path = geoPath().projection(projection);

    // Hexagon Radius and Geometry
    const hexRadius = 0.01;
    const hexGeometry = new THREE.CircleGeometry(hexRadius, 6);

    // Load GeoJSON Data for Countries
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then(worldData => {
        const countries = feature(worldData, worldData.objects.countries).features;

        countries.forEach(country => {
          const countryCoordinates = country.geometry.coordinates;

          countryCoordinates.forEach(polygon => {
            polygon.forEach(([lon, lat]) => {
              const latRad = lat * (Math.PI / 180);
              const lonRad = -lon * (Math.PI / 180); // Invert the longitude for the mirror effect

              // Convert latitude and longitude to 3D position on the sphere
              const xPos = radius * Math.cos(latRad) * Math.cos(lonRad);
              const yPos = radius * Math.sin(latRad);
              const zPos = radius * Math.cos(latRad) * Math.sin(lonRad);

              // Clone hex geometry and material for each position
              const hexMaterial = new THREE.MeshBasicMaterial({
                color: 0xAA8FFF,
                side: THREE.DoubleSide,
              });
              const hexMesh = new THREE.Mesh(hexGeometry, hexMaterial);

              // Position the hex on the sphere and make it face outward
              hexMesh.position.set(xPos, yPos, zPos);
              hexMesh.lookAt(0, 0, 0);

              // Add hex to the hexGroup
              hexGroup.add(hexMesh);
            });
          });
        });
      });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the hex group to simulate globe rotation
      hexGroup.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="relative w-full h-full" ref={mountRef} />;
};

export default GlobeWithHexCountries;
