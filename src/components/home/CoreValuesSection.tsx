import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Target, 
  Zap, 
  GraduationCap, 
  Award, 
  Clock 
} from 'lucide-react';

const coreValues = [
  {
    title: 'Profession',
    description: 'We show up on time, act and look the part with knowledge and the skill set to solve our customer need.',
    icon: Clock,
  },
  {
    title: 'Integrity',
    description: 'We uphold the highest ethical standards with trust and transparency.',
    icon: ShieldCheck,
  },
  {
    title: 'Customer Satisfaction',
    description: 'We focus on solving our customer problems, because without our customers, we do not exist.',
    icon: Target,
  },
  {
    title: 'Teamwork',
    description: 'We foster a culture of collaboration and recognize the strength of our team, and it propels the success and growth of our company.',
    icon: Users,
  },
  {
    title: 'Continuous Improvement',
    description: 'We embrace a culture of learning and actively seeking out opportunities for growth and improvement to better ourselves and serve our customers and community.',
    icon: GraduationCap,
  },
  {
    title: 'Accountability',
    description: 'We take ownership of our actions and decisions, being accountable for the quality of work and impact to our customers and the organization.',
    icon: Award,
  },
  {
    title: 'Innovation',
    description: 'Drives us to redefine standards and exceed expectations, embodying our core values.',
    icon: Zap,
  },
];

export const CoreValuesSection: React.FC = () => {
  return (
    <section id="core-values-section" className="relative py-24 bg-theme-main overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#121417 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-theme-fourth/10 text-theme-fourth text-[10px] font-nohemi font-bold uppercase tracking-[0.2em] mb-4"
            >
              Our Foundation
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-nohemi font-bold text-theme-third leading-[1.1] tracking-tight"
            >
              Our Core <span className="text-theme-fourth">Values</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-third/60 font-body text-lg max-w-sm leading-relaxed"
          >
            The principles that guide every technician, every call, and every solution we provide for the Phoenix community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreValues.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-[2rem] bg-theme-secondary border border-transparent hover:border-theme-fourth/20 transition-all duration-500 hover:shadow-2xl hover:shadow-theme-third/5"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-theme-main flex items-center justify-center mb-6 shadow-sm group-hover:bg-theme-fourth group-hover:scale-110 transition-all duration-500">
                <value.icon className="w-7 h-7 text-theme-fourth group-hover:text-theme-main transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-nohemi font-bold text-theme-third mb-4 tracking-tight">
                {value.title}
              </h3>
              <p className="text-theme-third/70 font-body text-sm leading-relaxed">
                {value.description}
              </p>

              {/* Decorative Number */}
              <span className="absolute top-8 right-8 text-4xl font-nohemi font-bold text-theme-third/[0.03] group-hover:text-theme-fourth/5 transition-colors duration-500">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
          
          {/* Mission Statement Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: coreValues.length * 0.1 }}
            className="lg:col-span-2 p-8 sm:p-12 rounded-[2rem] bg-theme-third text-theme-main relative overflow-hidden flex flex-col justify-center border border-theme-third"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-theme-fourth/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10 max-w-xl">
              <h3 className="text-3xl font-nohemi font-bold mb-6">Exceeding Expectations</h3>
              <p className="text-theme-main/70 font-body text-lg leading-relaxed">
                Innovation drives us to redefine standards and exceed expectations, embodying our core values in every service we deliver to our customers and community.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
