// src/components/GlobeWithHexes.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as topojson from 'topojson-client';
import { geoEquirectangular, geoPath } from 'd3-geo';

const GlobeWithHexes = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Initialize Scene and Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create Sphere (Globe)
    const radius = 2;
    const sphereGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xAA8FFF, wireframe: true });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    // D3 Projection and Path for GeoJSON
    const projection = geoEquirectangular().translate([0, 0]).scale(radius * 100);
    const path = geoPath().projection(projection);

    // Load GeoJSON Data for Countries
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-50m.json')
      .then(response => response.json())
      .then(worldData => {
        const countries = topojson.feature(worldData, worldData.objects.countries).features;

        // Define hex radius for hexagons on the globe
        const hexRadius = 0.02;

        // Place hexagons for each country
        countries.forEach(country => {
          const countryCoordinates = country.geometry.coordinates;

          countryCoordinates.forEach(polygon => {
            polygon.forEach(([lon, lat]) => {
              const latRad = lat * (Math.PI / 180);
              const lonRad = lon * (Math.PI / 180);

              // Convert latitude and longitude to 3D position on the sphere
              const xPos = radius * Math.cos(latRad) * Math.cos(lonRad);
              const yPos = radius * Math.sin(latRad);
              const zPos = radius * Math.cos(latRad) * Math.sin(lonRad);

              // Create a hexagon shape
              const hexGeometry = new THREE.CircleGeometry(hexRadius, 3);
              const hexMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500, side: THREE.DoubleSide });
              const hexMesh = new THREE.Mesh(hexGeometry, hexMaterial);

              // Position the hex on the sphere and make it face outward
              hexMesh.position.set(xPos, yPos, zPos);
              hexMesh.lookAt(0, 0, 0);

              scene.add(hexMesh);
            });
          });
        });
      });

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div class="relative px-8 py-12 mx-auto max-w-7xl md:px-12 lg:px-16 lg:pt-24 flex items-center justify-center" ref={mountRef} />;
};

export default GlobeWithHexes;
