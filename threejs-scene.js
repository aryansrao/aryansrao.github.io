import * as THREE from 'three';

// Initialize Three.js scene for the accent box
function initAccentScene() {
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a glowing torus knot
    const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16);
    
    // Material with wireframe for minimal aesthetic
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add particles around the object
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 4;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
        
        targetRotationX = mouseY * 0.5;
        targetRotationY = mouseX * 0.5;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth rotation towards mouse
        torusKnot.rotation.x += (targetRotationX - torusKnot.rotation.x) * 0.05;
        torusKnot.rotation.y += (targetRotationY - torusKnot.rotation.y) * 0.05;
        
        // Continuous slow rotation
        torusKnot.rotation.x += 0.002;
        torusKnot.rotation.y += 0.003;

        // Rotate particles slowly
        particles.rotation.y += 0.001;

        // Pulse effect
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
        torusKnot.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// Initialize Three.js scene for the Development service card
function initDevelopmentScene() {
    const canvas = document.getElementById('development-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create multiple geometric shapes (representing code/structure)
    const shapes = [];
    
    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const icoMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    icosahedron.position.set(-2, 1, 0);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Octahedron
    const octGeo = new THREE.OctahedronGeometry(1.2, 0);
    const octMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.7
    });
    const octahedron = new THREE.Mesh(octGeo, octMat);
    octahedron.position.set(2, -0.5, -2);
    scene.add(octahedron);
    shapes.push(octahedron);

    // Dodecahedron
    const dodGeo = new THREE.DodecahedronGeometry(1, 0);
    const dodMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const dodecahedron = new THREE.Mesh(dodGeo, dodMat);
    dodecahedron.position.set(0, -1.5, 1);
    scene.add(dodecahedron);
    shapes.push(dodecahedron);

    // Add connecting lines between shapes
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
            linePositions.push(
                shapes[i].position.x, shapes[i].position.y, shapes[i].position.z,
                shapes[j].position.x, shapes[j].position.y, shapes[j].position.z
            );
        }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true,
        opacity: 0.4
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Rotate all shapes independently
        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.003 * (index + 1);
            shape.rotation.y += 0.002 * (index + 1);
            
            // Add floating motion
            shape.position.y += Math.sin(time + index) * 0.002;
        });

        // Rotate particles
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0003;

        // Camera follows mouse slightly
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    
    resizeObserver.observe(container);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAccentScene();
        initDevelopmentScene();
        initUIUXScene();
    });
} else {
    initAccentScene();
    initDevelopmentScene();
    initUIUXScene();
}

// Initialize Three.js scene for the UI/UX Design service card
function initUIUXScene() {
    const canvas = document.getElementById('uiux-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera with better perspective
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create only the main central sphere
    const mainGeo = new THREE.IcosahedronGeometry(2.5, 2);
    const mainMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const mainSphere = new THREE.Mesh(mainGeo, mainMat);
    scene.add(mainSphere);

    // Advanced mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
        
        targetRotationX = mouseY * 0.5;
        targetRotationY = mouseX * 0.5;
    });

    // Clean animation loop
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Smooth rotation following mouse
        mainSphere.rotation.x += (targetRotationX - mainSphere.rotation.x) * 0.05;
        mainSphere.rotation.y += (targetRotationY - mainSphere.rotation.y) * 0.05;

        // Gentle continuous rotation
        mainSphere.rotation.x += 0.003;
        mainSphere.rotation.y += 0.005;

        // Subtle pulsing animation
        const scale = 1 + Math.sin(time * 1.5) * 0.08;
        mainSphere.scale.setScalar(scale);

        renderer.render(scene, camera);
    }

    animate();

    // Enhanced resize handling
    const resizeObserver = new ResizeObserver(() => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    
    resizeObserver.observe(container);
}
