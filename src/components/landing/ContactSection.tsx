"use client";

import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

// --- FIX 1: Define a specific type for FormField props ---
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  halfWidth?: boolean;
}
const FormField = ({ label, name, type, placeholder, halfWidth = false }: FormFieldProps) => (
  <div className={halfWidth ? "sm:col-span-1" : "sm:col-span-2"}>
    <label htmlFor={name} className="block text-sm font-medium text-neutral-400 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
      required
    />
  </div>
);

// --- FIX 2: Define a specific type for FormTextarea props ---
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}
const FormTextarea = ({ label, name, placeholder }: FormTextareaProps) => (
    <div className="sm:col-span-2">
        <label htmlFor={name} className="block text-sm font-medium text-neutral-400 mb-2">
            {label}
        </label>
        <textarea
            name={name}
            id={name}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
            required
        />
    </div>
);

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-6 bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-no-repeat bg-center opacity-10"
        style={{ backgroundImage: "url('/world-map.svg')", backgroundSize: '1200px auto' }}
      ></div>

      <div className="container max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h2>
          <p className="text-lg text-neutral-400 mt-4">
            Get in touch and let&apos;s have a chat. We would love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form 
            action="https://formspree.io/f/xqadvbko" // Replace with your Formspree ID
            method="POST" 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <FormField label="First Name" name="first-name" type="text" placeholder="Peter" halfWidth />
            <FormField label="Last Name" name="last-name" type="text" placeholder="Parker" halfWidth />
            <FormField label="Email" name="email" type="email" placeholder="peter@parker.com" />
            <FormTextarea label="How can we help you?" name="message" placeholder="Enter your message..." />
            
            <div className="sm:col-span-2 flex justify-center mt-4">
                <Button type="submit" className="bg-white text-black hover:bg-neutral-200 rounded-full px-12 py-3 text-base font-semibold">
                    Submit
                </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}