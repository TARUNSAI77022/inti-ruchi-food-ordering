import React, { Suspense, useRef, useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, UtensilsCrossed, Sparkles, Star } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const FoodBowl3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
        groupRef.current.rotation.y += 0.005;
        groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.3}>
      {/* Bowl */}
      <mesh position={[0, -0.4, 0]}>
        <sphereGeometry args={[1.1, 64, 64, 0, Math.PI*2, 0, Math.PI*0.55]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Rim */}
      <mesh position={[0, -0.18, 0]}>
        <torusGeometry args={[1.1, 0.03, 16, 100]} />
        <meshStandardMaterial color="#F5A623" emissive="#F5A623" emissiveIntensity={0.5} />
      </mesh>

      {/* Saffron/Rice Layers */}
      {[
        { pos: [0, 0.15, 0], size: 0.9, color: "#8B4513" },
        { pos: [0.2, 0.2, 0.1], size: 0.35, color: "#F5A623" },
        { pos: [-0.2, 0.2, -0.1], size: 0.3, color: "#CC4400" },
        { pos: [0.1, 0.3, -0.2], size: 0.25, color: "#228B22" },
      ].map((item, i) => (
        <mesh key={i} position={item.pos as any}>
          <sphereGeometry args={[item.size, 32, 32]} />
          <meshStandardMaterial color={item.color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

const PremiumHero: React.FC = () => {
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
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms
  const textX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const textY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const bowlX = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const badgeX = useTransform(springX, [-0.5, 0.5], [-60, 60]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20">
      
      {/* LAYER 1: Background Global Depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
           style={{ x: useTransform(springX, [-0.5, 0.5], [-10, 10]), y: useTransform(springY, [-0.5, 0.5], [-10, 10]) }}
           className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-[150px] animate-pulse" 
        />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#F5A623]/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        
        {/* LAYER 2: Text Content (Medium Parallax) */}
        <motion.div
          style={{ x: textX, y: textY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-xl">
            <Sparkles size={14} />
            The Signature Heritage
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white uppercase italic">
            Taste the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200 drop-shadow-[0_0_30px_rgba(245,166,35,0.4)]">
                Andhra
            </span> <br />
            Soul
          </h1>
          
          <p className="text-lg md:text-2xl text-white/40 max-w-lg font-medium leading-relaxed">
            Experience the rich culinary tradition of Andhra Pradesh with our handcrafted recipes passed down through generations.
          </p>
          
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 166, 35, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-black rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-[#F5A623] hover:text-white transition-all flex items-center gap-4 shadow-2xl"
            >
              Order Now <ArrowRight size={22} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
              className="px-12 py-6 rounded-3xl border border-white/10 text-white text-sm font-black uppercase tracking-widest transition-all backdrop-blur-xl"
            >
              The Story
            </motion.button>
          </div>
        </motion.div>

        {/* LAYER 3: 3D Visualization (Slow Parallax) */}
        <div className="relative h-[600px] flex items-center justify-center">
          
          {/* Radial Glow Behind Object */}
          <div className="absolute w-[400px] h-[400px] bg-[#F5A623]/15 rounded-full blur-[80px] pointer-events-none" />

          <motion.div
            style={{ x: bowlX }}
            className="w-full h-full relative z-10"
          >
            <Canvas
              gl={{ alpha: true, antialias: true }}
              camera={{ position: [0, 0, 4], fov: 45 }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <FoodBowl3D />
                </Float>
                <Environment preset="city" />
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} />
              </Suspense>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#F5A623" />
            </Canvas>
          </motion.div>
          
          {/* LAYER 4: Floating Badges (Fast Parallax) */}
          <motion.div 
            style={{ x: badgeX }}
            animate={{ 
                y: [0, -15, 0],
                rotate: [-2, 2, -2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -right-5 md:-right-10 p-8 bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-3xl z-20 hidden sm:flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Star fill="currentColor" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-white italic">4.9</span>
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Top Rated</span>
            </div>
          </motion.div>

          <motion.div 
            style={{ x: useTransform(springX, [-0.5, 0.5], [50, -50]) }}
            animate={{ 
                y: [0, 15, 0],
                rotate: [2, -2, 2]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 -left-10 p-6 bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-3xl z-20 hidden md:flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 border border-white/10">
                <UtensilsCrossed size={28} />
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-widest uppercase italic leading-none mb-1">Elite</div>
              <div className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.2em] leading-none">Michelin Selection</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;
