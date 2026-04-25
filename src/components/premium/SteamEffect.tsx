import { motion } from 'framer-motion';

const SteamEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0, scale: 0.8 }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.4, 0],
            scale: [1, 1.5, 2],
            x: [0, (i - 1) * 20, (i - 1) * 40]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut"
          }}
          className="absolute bottom-1/2 w-8 h-20 bg-white/5 blur-2xl rounded-full"
        />
      ))}
    </div>
  );
};

export default SteamEffect;
