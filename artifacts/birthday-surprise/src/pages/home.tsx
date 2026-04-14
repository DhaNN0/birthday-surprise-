import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const TARGET_DATE = new Date("2026-04-15T00:00:00").getTime();

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.5, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-accent/20 blur-[100px] mix-blend-screen" />
      </div>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="absolute inset-0 flex">
              <motion.div
                exit={{ x: "-100%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-1/2 h-full bg-card border-r border-primary/20 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
              />
              <motion.div
                exit={{ x: "100%" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-1/2 h-full bg-card border-l border-primary/20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
              />
            </div>
            
            <motion.div 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse border border-primary/30">
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </div>
              <p className="text-foreground/70 font-sans tracking-widest uppercase text-sm">Tap to open</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <main className="relative z-10 w-full">
          {/* Particles */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: "110vh", 
                  x: `${Math.random() * 100}vw`,
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.5,
                  rotate: Math.random() * 360
                }}
                animate={{ 
                  y: "-10vh",
                  x: `${Math.random() * 100}vw`,
                  opacity: [0, 0.8, 0],
                  rotate: Math.random() * 360 + 360
                }}
                transition={{ 
                  duration: Math.random() * 15 + 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 10
                }}
                className="absolute text-primary/30"
              >
                {i % 3 === 0 ? <Heart className="w-4 h-4 fill-primary/30" /> : 
                 i % 3 === 1 ? <Sparkles className="w-3 h-3" /> : 
                 <Star className="w-2 h-2 fill-primary/30" />}
              </motion.div>
            ))}
          </div>

          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20 text-center">
            <motion.div
              style={{ y: y1, opacity: opacity1 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="mb-8 inline-block"
              >
                <span className="font-sans text-secondary tracking-[0.3em] uppercase text-sm font-medium">A Celebration of You</span>
              </motion.div>
              
              <h1 className="font-[family-name:var(--font-display)] text-7xl md:text-9xl lg:text-[10rem] text-foreground mb-6 leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Jhanvi
              </h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2 }}
              >
                <p className="font-serif text-2xl md:text-3xl text-foreground/80 italic mb-12">
                  April 15, 2026
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <div className="w-[1px] h-24 bg-gradient-to-b from-primary/50 to-transparent" />
            </motion.div>
          </section>

          {/* Countdown/Countup Section */}
          <section className="min-h-[60vh] flex items-center justify-center relative px-6 py-24">
            <div className="max-w-3xl mx-auto text-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-16 italic">Waiting for your special day...</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds },
                  ].map((item, i) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-primary/20 flex items-center justify-center mb-4 bg-card/50 backdrop-blur-sm shadow-[0_0_30px_rgba(226,38,88,0.1)] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                        <span className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-secondary relative z-10">{item.value}</span>
                      </div>
                      <span className="font-sans text-foreground/60 tracking-widest uppercase text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Message Section */}
          <section className="min-h-screen flex items-center justify-center relative px-6 py-24">
            <motion.div 
              style={{ y: y2 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-200px" }}
                transition={{ duration: 1.5 }}
                className="relative"
              >
                <Heart className="w-12 h-12 text-primary/20 mx-auto mb-12 absolute -top-16 left-1/2 -translate-x-1/2" />
                
                <div className="space-y-8 font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed italic relative z-10 p-8 md:p-12 rounded-3xl border border-primary/10 bg-card/30 backdrop-blur-md shadow-2xl">
                  <p>
                    Every moment leading up to this day is just a prelude to celebrating the incredible person you are.
                  </p>
                  <p>
                    Your smile lights up rooms. Your kindness warms hearts. And your spirit brings magic to the mundane.
                  </p>
                  <p>
                    This is a space just for you—a small reminder of how deeply cherished you are, today and every day.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Footer closing */}
          <footer className="py-24 text-center px-6 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-16 h-[1px] bg-secondary/50" />
              <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-secondary">
                Happy Birthday, Jhanvi
              </p>
              <p className="font-sans text-xs tracking-widest text-foreground/40 uppercase">
                Made with love
              </p>
            </motion.div>
          </footer>
        </main>
      )}
    </div>
  );
}