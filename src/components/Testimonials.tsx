import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Camera, Globe, Share2 } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    { name: "Srinivas Rao", role: "Food Critic", text: "The best Andhra meals experience — authentic flavors and incredible hospitality. Each dish tells a story of heritage." },
    { name: "Priya Varma", role: "Local Guide", text: "Simply outstanding. The Gongura mutton and shrimp curry are to die for. The ambiance and glass panels make it a truly premium experience." },
    { name: "Anish Kumar", role: "Chef", text: "Authentic recipes crafted with precision. The spices are roasted perfectly, capturing the true essence of Godavari cuisine." }
  ];

  return (
    <section className="py-40 relative z-20 bg-black/40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col space-y-24">
        
        {/* Testimonials Header */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
           <div className="feature-pill">Feedback</div>
           <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
              What Our <br /> <span className="italic-emphasis opacity-60">Guests Say</span>
           </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="liquid-glass-strong p-10 rounded-[50px] border-white/20 flex flex-col space-y-8 relative hover:border-white/40 transition-colors"
            >
               <div className="text-4xl text-white/20 italic-emphasis absolute top-8 left-8">"</div>
               <p className="text-lg text-white/80 leading-relaxed font-light italic-emphasis relative z-10 pt-4">
                  {review.text}
               </p>
               <div className="flex flex-col space-y-1">
                  <span className="text-white font-medium tracking-tight">{review.name}</span>
                  <span className="text-white/40 text-xs uppercase tracking-widest">{review.role}</span>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div id="contact" className="pt-40 grid grid-cols-1 lg:grid-cols-2 gap-24">
           {/* Info Column */}
           <div className="flex flex-col space-y-12">
              <div className="flex flex-col space-y-6">
                 <h2 className="text-5xl md:text-7xl font-light text-white tracking-tighter">
                    Godavari <br /> <span className="italic-emphasis opacity-60">Vari Vindhu Maryada</span>
                 </h2>
                 <p className="text-white/40 text-lg leading-relaxed max-w-sm">
                    Authentic Andhra cuisine celebrating the flavors of the Godavari region.
                 </p>
              </div>

              <div className="flex flex-col space-y-8">
                 <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-white/50"><MapPin size={20} /></div>
                    <div className="flex flex-col space-y-1 pt-2">
                       <span className="text-white font-medium">Location</span>
                       <span className="text-white/40 text-sm">Madhapur, Hyderabad | Beach Road, Visakhapatnam</span>
                    </div>
                 </div>

                 <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-white/50"><Phone size={20} /></div>
                    <div className="flex flex-col space-y-1 pt-2">
                       <span className="text-white font-medium">Reservations</span>
                       <span className="text-white/40 text-sm">+91 98765 43210 | +91 91234 56789</span>
                    </div>
                 </div>

                 <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-white/50"><Mail size={20} /></div>
                    <div className="flex flex-col space-y-1 pt-2">
                       <span className="text-white font-medium">Inquiries</span>
                       <span className="text-white/40 text-sm">hello@godavarivvm.com</span>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 {[Camera, Globe, Share2].map((Icon, idx) => (
                    <motion.a 
                      key={idx} 
                      href="#" 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    >
                       <Icon size={20} />
                    </motion.a>
                 ))}
              </div>
           </div>

           {/* Map Column */}
           <div className="w-full h-full min-h-[500px] rounded-[60px] overflow-hidden liquid-glass-strong p-3 border-white/20">
              <div className="w-full h-full rounded-[48px] overflow-hidden grayscale invert relative">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.324869502!2d78.3752!3d17.4483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI2JzU0LjMiTiA3OMKwMjInMzAuNyJF!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen={true} 
                   loading="lazy"
                   className="absolute inset-0 grayscale contrast-[1.2] opacity-70"
                 ></iframe>
                 <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
