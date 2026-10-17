"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CricketBall3DProps {
  scrollProgress: number; // 0 to 1 as the user scrolls through the 200vh section
  className?: string;
}

/**
 * Creates high-resolution procedural textures for an authentic Red Test Match Cricket Ball:
 * 1. Albedo: Deep crimson red leather, alternating white waxed seam stitches, quarter seams, and gold foil stamp
 * 2. Bump: Raised seam ridge, 3D thread relief, and leather grain pores
 * 3. Roughness: High-gloss lacquer shine on the polished side vs natural satin leather
 */
function createCricketBallTextures(): {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
} {
  const width = 2048;
  const height = 1024;

  // 1. Color (Albedo) Canvas
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext("2d")!;

  // 2. Bump / Height Canvas
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bCtx = bumpCanvas.getContext("2d")!;

  // 3. Roughness Canvas
  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext("2d")!;

  // Fill base color: Deep cherry red test leather with subtle tone gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, "#7E080D");
  grad.addColorStop(0.25, "#930E14");
  grad.addColorStop(0.5, "#860A0F");
  grad.addColorStop(0.75, "#981219");
  grad.addColorStop(1, "#7A070B");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Bump neutral gray (128)
  bCtx.fillStyle = "#808080";
  bCtx.fillRect(0, 0, width, height);

  // Roughness: one hemisphere polished glossy (0.15), other side satin (0.42)
  const rGrad = rCtx.createLinearGradient(0, 0, width, 0);
  rGrad.addColorStop(0, "rgb(40, 40, 40)"); // Very glossy
  rGrad.addColorStop(0.48, "rgb(55, 55, 55)");
  rGrad.addColorStop(0.52, "rgb(115, 115, 115)"); // Satin side
  rGrad.addColorStop(1, "rgb(110, 110, 110)");
  rCtx.fillStyle = rGrad;
  rCtx.fillRect(0, 0, width, height);

  // Leather micro-grain noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const bImgData = bCtx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const bData = bImgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 14;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.4));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.4));

    const bNoise = (Math.random() - 0.5) * 10;
    bData[i] = Math.min(255, Math.max(0, bData[i] + bNoise));
    bData[i + 1] = Math.min(255, Math.max(0, bData[i + 1] + bNoise));
    bData[i + 2] = Math.min(255, Math.max(0, bData[i + 2] + bNoise));
  }
  ctx.putImageData(imgData, 0, 0);
  bCtx.putImageData(bImgData, 0, 0);

  // --- QUARTER SEAMS (Perpendicular indentations on real test cricket balls) ---
  const qY1 = height * 0.25;
  const qY2 = height * 0.75;
  [qY1, qY2].forEach((qy) => {
    ctx.strokeStyle = "rgba(45, 2, 4, 0.45)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, qy);
    ctx.lineTo(width, qy);
    ctx.stroke();

    bCtx.strokeStyle = "rgb(80, 80, 80)"; // Indented
    bCtx.lineWidth = 2.5;
    bCtx.beginPath();
    bCtx.moveTo(0, qy);
    bCtx.lineTo(width, qy);
    bCtx.stroke();
  });

  // --- EQUATORIAL SEAM (The defining feature of a test cricket ball) ---
  const seamY = height * 0.5;
  const seamWidth = 44; // seam strip width

  // Raised seam ridge on bump map
  bCtx.fillStyle = "rgb(185, 185, 185)"; // Elevated ridge
  bCtx.fillRect(0, seamY - seamWidth / 2, width, seamWidth);

  // Darker boundary groove
  bCtx.fillStyle = "rgb(60, 60, 60)";
  bCtx.fillRect(0, seamY - seamWidth / 2 - 2, width, 2);
  bCtx.fillRect(0, seamY + seamWidth / 2, width, 2);

  // Seam leather band color (slightly darker/firmer compressed leather)
  ctx.fillStyle = "rgba(75, 4, 8, 0.9)";
  ctx.fillRect(0, seamY - seamWidth / 2, width, seamWidth);

  // Stitches: Real test balls have 6 rows of stitches (approx 75-80 stitches per side)
  const stitchCount = 180;
  const stepX = width / stitchCount;

  // Stitches in Roughness: threads are matte waxed cord (higher roughness)
  rCtx.fillStyle = "rgb(190, 190, 190)";
  rCtx.fillRect(0, seamY - seamWidth / 2, width, seamWidth);

  for (let s = 0; s < stitchCount; s++) {
    const x = s * stepX;
    const isOdd = s % 2 === 0;

    // Central herringbone cross-stitches (/\/\/\ pattern)
    ctx.strokeStyle = isOdd ? "#FFFFFF" : "#F4ECE1";
    ctx.lineWidth = 3.2;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (isOdd) {
      ctx.moveTo(x - 2, seamY - 10);
      ctx.lineTo(x + stepX + 2, seamY + 10);
    } else {
      ctx.moveTo(x - 2, seamY + 10);
      ctx.lineTo(x + stepX + 2, seamY - 10);
    }
    ctx.stroke();

    // High relief for central stitches on bump map
    bCtx.strokeStyle = "rgb(255, 255, 255)";
    bCtx.lineWidth = 3.4;
    bCtx.lineCap = "round";
    bCtx.beginPath();
    if (isOdd) {
      bCtx.moveTo(x - 2, seamY - 10);
      bCtx.lineTo(x + stepX + 2, seamY + 10);
    } else {
      bCtx.moveTo(x - 2, seamY + 10);
      bCtx.lineTo(x + stepX + 2, seamY - 10);
    }
    bCtx.stroke();

    // Outer row lock stitches (parallel rows on top & bottom edges of seam)
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(x, seamY - 16);
    ctx.lineTo(x + stepX * 0.7, seamY - 16);
    ctx.moveTo(x, seamY + 16);
    ctx.lineTo(x + stepX * 0.7, seamY + 16);
    ctx.stroke();

    bCtx.strokeStyle = "rgb(240, 240, 240)";
    bCtx.lineWidth = 2.6;
    bCtx.beginPath();
    bCtx.moveTo(x, seamY - 16);
    bCtx.lineTo(x + stepX * 0.7, seamY - 16);
    bCtx.moveTo(x, seamY + 16);
    bCtx.lineTo(x + stepX * 0.7, seamY + 16);
    bCtx.stroke();
  }

  // --- EMBOSSED METALLIC GOLD FOIL STAMP (Test match maker stamp) ---
  const stampCenterX = width * 0.25; // on the polished front hemisphere
  const stampCenterY = height * 0.26;

  ctx.save();
  ctx.translate(stampCenterX, stampCenterY);

  // Outer gold foil double ring
  ctx.strokeStyle = "#E4BE52";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 0, 78, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "#F9DC7A";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, 72, 0, Math.PI * 2);
  ctx.stroke();

  // Arched text "SUNRISERS LEEDS"
  ctx.fillStyle = "#FFDF79";
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const bannerText = "SUNRISERS LEEDS";
  for (let c = 0; c < bannerText.length; c++) {
    const angle = -Math.PI / 2 + (c - bannerText.length / 2 + 0.5) * 0.16;
    ctx.save();
    ctx.rotate(angle);
    ctx.translate(0, -56);
    ctx.fillText(bannerText[c], 0, 0);
    ctx.restore();
  }

  // Central Gold Emblem / Eagle / Stars
  ctx.fillStyle = "#FFDF79";
  ctx.beginPath();
  // Stylized sun & crown crest
  ctx.arc(0, -6, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#7E080D";
  ctx.beginPath();
  ctx.arc(0, -6, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFDF79";
  ctx.font = "bold 10px sans-serif";
  ctx.fillText("SRL", 0, -5);

  ctx.font = "900 12px sans-serif";
  ctx.fillText("TEST SPECIAL", 0, 22);

  ctx.font = "bold 9px sans-serif";
  ctx.fillStyle = "#E4BE52";
  ctx.fillText("GRADE 1 LEATHER", 0, 36);

  ctx.restore();

  // Subtle gold bump relief
  bCtx.save();
  bCtx.translate(stampCenterX, stampCenterY);
  bCtx.strokeStyle = "rgb(170, 170, 170)";
  bCtx.lineWidth = 3;
  bCtx.beginPath();
  bCtx.arc(0, 0, 78, 0, Math.PI * 2);
  bCtx.stroke();
  bCtx.restore();

  // High metallic reflection for the gold stamp
  rCtx.save();
  rCtx.translate(stampCenterX, stampCenterY);
  rCtx.fillStyle = "rgb(25, 25, 25)"; // Super reflective
  rCtx.beginPath();
  rCtx.arc(0, 0, 80, 0, Math.PI * 2);
  rCtx.fill();
  rCtx.restore();

  // Convert canvases to Three.js textures
  const map = new THREE.CanvasTexture(colorCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.generateMipmaps = true;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.generateMipmaps = true;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.generateMipmaps = true;

  return { map, bumpMap, roughnessMap };
}

export function CricketBall3D({ scrollProgress, className }: CricketBall3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(scrollProgress);
  progressRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 3.8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Generate Cricket Ball Textures
    const textures = createCricketBallTextures();

    // 5. Material: MeshPhysicalMaterial with high clearcoat lacquer shine
    const ballMaterial = new THREE.MeshPhysicalMaterial({
      map: textures.map,
      bumpMap: textures.bumpMap,
      bumpScale: 0.048,
      roughnessMap: textures.roughnessMap,
      roughness: 0.22,
      metalness: 0.03,
      clearcoat: 0.95, // Thick glossy lacquer layer
      clearcoatRoughness: 0.08,
      reflectivity: 0.85,
      sheen: 0.45,
      sheenColor: new THREE.Color(0xff2222)
    });

    // 6. Ball Geometry (High-resolution sphere)
    const ballGeometry = new THREE.SphereGeometry(1.0, 128, 128);
    const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    // Initial pose showcasing the seam angled dynamically
    ballMesh.rotation.x = 0.35;
    ballMesh.rotation.y = 0.8;
    ballMesh.rotation.z = -0.25;
    scene.add(ballMesh);

    // 7. Contact Drop Shadow beneath the ball
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d")!;
    const shadowGrad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
    shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.45)");
    shadowGrad.addColorStop(0.3, "rgba(20, 5, 5, 0.25)");
    shadowGrad.addColorStop(0.7, "rgba(50, 10, 10, 0.08)");
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = shadowGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.6, 2.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.22;
    scene.add(shadowMesh);

    // 8. Studio Lighting Rig
    // Key Light: Sharp warm white directional highlight
    const keyLight = new THREE.DirectionalLight(0xfff6ed, 3.2);
    keyLight.position.set(3.5, 4.0, 4.5);
    scene.add(keyLight);

    // Fill Light: Soft neutral light
    const fillLight = new THREE.DirectionalLight(0xdce7f5, 1.4);
    fillLight.position.set(-4.0, 1.5, 2.5);
    scene.add(fillLight);

    // Sunrisers Leeds Orange Rim Light: Dramatic backlight grazing the sphere's edge
    const rimLight = new THREE.DirectionalLight(0xff5500, 3.8);
    rimLight.position.set(-1.0, 3.0, -3.5);
    scene.add(rimLight);

    // Bottom Bounce Light: Warm subtle floor reflection
    const bounceLight = new THREE.DirectionalLight(0xffddbb, 0.8);
    bounceLight.position.set(0, -3.0, 2.0);
    scene.add(bounceLight);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // 9. Mouse interaction lerp tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 0.45;
      targetMouseY = y * 0.45;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const progress = progressRef.current;

      // Mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate ball around its axis based on scroll progress (2 full rotations across 200vh)
      // plus subtle idle precession
      const scrollRotY = progress * Math.PI * 4;
      const scrollRotX = Math.sin(progress * Math.PI) * 0.5;
      const scrollRotZ = progress * Math.PI * 0.8;

      ballMesh.rotation.y = 0.8 + scrollRotY + mouseX + Math.sin(elapsedTime * 0.5) * 0.05;
      ballMesh.rotation.x = 0.35 + scrollRotX - mouseY + Math.cos(elapsedTime * 0.4) * 0.04;
      ballMesh.rotation.z = -0.25 + scrollRotZ * 0.5;

      // Subtle breathing float on Y axis
      ballMesh.position.y = Math.sin(elapsedTime * 1.5) * 0.035;
      shadowMesh.scale.setScalar(1 - ballMesh.position.y * 0.3);

      renderer.render(scene, camera);
    };

    animate();

    // 11. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      ballGeometry.dispose();
      ballMaterial.dispose();
      textures.map.dispose();
      textures.bumpMap.dispose();
      textures.roughnessMap.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${
        className ?? ""
      }`}
    />
  );
}
