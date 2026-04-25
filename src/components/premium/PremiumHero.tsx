import React, { Suspense, useRef, useEffect, useState } from 'react';
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Utensils } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import SpiceParticles from './SpiceParticles';
import SteamEffect from './SteamEffect';

const ClayPotBiryani3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
        groupRef.current.rotation.y += 0.003;
        groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Handi / Clay Pot */}
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[1.2, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#3D2B1F" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Handi Rim */}
      <mesh position={[0, -0.15, 0]}>
        <torusGeometry args={[1.22, 0.04, 16, 100]} />
        <meshStandardMaterial color="#2A1E15" />
      </mesh>

      {/* Biryani Content (Rice/Spices) */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 64]} />
        <meshStandardMaterial color="#F5A623" roughness={0.8} />
      </mesh>

      {/* Scattered Toppings */}
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i) * 0.6 + (Math.random() - 0.5) * 0.2,
            0.02,
            Math.sin(i) * 0.6 + (Math.random() - 0.5) * 0.2
          ]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#8B4513" : "#228B22"} />
        </mesh>
      ))}

      <SpiceParticles count={40} />
    </group>
  );
};

const PremiumHero: React.FC = () => {
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate 3D loading or check support
    const timer = setTimeout(() => setIs3DLoaded(true), 1000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  const textX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const textY = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  const bowlX = useTransform(springX, [-0.5, 0.5], [-50, 50]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 bg-[#050505]">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
           style={{ 
             x: useTransform(springX, [-0.5, 0.5], [-30, 30]), 
             y: useTransform(springY, [-0.5, 0.5], [-30, 30]) 
           }}
           className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[180px] animate-glow-pulse" 
        />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(245,166,35,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
        
        {/* Left Content */}
        <motion.div
          style={{ x: textX, y: textY }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-3xl">
            <Sparkles size={14} className="animate-pulse" />
            The Signature Heritage V9
          </div>
          
          <h1 className="text-[5.5rem] md:text-[9.5rem] font-black tracking-tighter leading-[0.8] text-white uppercase italic">
            Taste the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-500 via-amber-200 to-amber-700 drop-shadow-[0_0_40px_rgba(245,166,35,0.3)]">
                Andhra
            </span> <br />
            Soul
          </h1>
          
          <p className="text-xl md:text-2xl text-white/40 max-w-lg font-medium leading-relaxed border-l-2 border-amber-500/20 pl-10">
            Immerse yourself in the rich culinary fire of Andhra Pradesh. Handcrafted recipes, passed down through the soul of tradition.
          </p>
          
          <div className="flex flex-wrap items-center gap-10 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(245, 166, 35, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-7 bg-amber-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-5 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              Order Experience <ArrowRight size={22} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="px-14 py-7 rounded-[2rem] border border-white/10 text-white/60 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-all backdrop-blur-xl"
            >
              The Story
            </motion.button>
          </div>
        </motion.div>

        {/* Right Visualization (Hybrid) */}
        <div className="relative h-[650px] flex items-center justify-center">
          
          {/* Fire Glow Base */}
          <div className="absolute bottom-1/4 w-[450px] h-[100px] bg-amber-600/20 rounded-full blur-[80px] animate-glow-pulse" />
          
          <motion.div
            style={{ x: bowlX }}
            className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              {is3DLoaded ? (
                <motion.div
                  key="3d"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-full h-full"
                >
                  <Canvas
                    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    style={{ background: 'transparent' }}
                  >
                    <Suspense fallback={null}>
                      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
                          <ClayPotBiryani3D />
                      </Float>
                      <Environment preset="sunset" />
                      <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={8} blur={3} far={10} color="#3d2b1f" />
                    </Suspense>
                    <ambientLight intensity={0.6} />
                    <pointLight position={[5, 5, 5]} intensity={2} color="#F5A623" />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B4513" />
                  </Canvas>
                </motion.div>
              ) : (
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-4/5 aspect-square rounded-[5rem] overflow-hidden shadow-3d-lg border border-white/10 group">
                    <img 
                        src="/premium_biryani_fallback_1777087548958.png" 
                        alt="Signature Biryani" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Overlay Effects */}
            <SteamEffect />
          </motion.div>
          
          {/* Floating Accents */}
          <motion.div 
            style={{ x: useTransform(springX, [-0.5, 0.5], [-40, 40]) }}
            animate={{ y: [0, -20, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-0 p-8 bg-[#111]/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-3xl z-20 flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-glow-primary">
                <Star size={24} fill="currentColor" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white italic tracking-tighter">4.9</div>
              <div className="text-[10px] font-black text-amber-500/60 uppercase tracking-widest">Heritage Rating</div>
            </div>
          </motion.div>

          <motion.div 
            style={{ x: useTransform(springX, [-0.5, 0.5], [60, -60]) }}
            animate={{ y: [0, 20, 0], rotate: [2, -2, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-0 p-7 bg-[#111]/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-3xl z-20 flex items-center gap-6"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-amber-500/10 animate-pulse" />
                <Utensils size={32} className="relative z-10" />
            </div>
            <div>
              <div className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none mb-1">Traditional</div>
              <div className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] leading-none">Clay Pot Cooking</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;
