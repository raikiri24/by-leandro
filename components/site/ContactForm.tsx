"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    build: "",
    problem: "",
    budget: "",
    timeline: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Project Inquiry: ${formData.build.slice(0, 40)}${formData.build.length > 40 ? "..." : ""}`);
    const body = encodeURIComponent(
      `Hello Paul,\n\n` +
      `A new project inquiry has been submitted with the following details:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company/Organization: ${formData.company || "N/A"}\n\n` +
      `What would you like to build:\n${formData.build}\n\n` +
      `What problem are you trying to solve:\n${formData.problem}\n\n` +
      `Estimated budget: ${formData.budget || "N/A"}\n` +
      `Preferred timeline: ${formData.timeline || "N/A"}\n`
    );

    window.location.href = `mailto:paulleandrolanot@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Name <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            value={formData.name}
            onChange={handleChange}
            className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email <span className="text-red-500">*</span></label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            value={formData.email}
            onChange={handleChange}
            className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="text-sm font-medium text-foreground">Company / Organization <span className="text-secondaryText font-normal">(optional)</span></label>
        <input 
          type="text" 
          id="company" 
          name="company" 
          value={formData.company}
          onChange={handleChange}
          className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="build" className="text-sm font-medium text-foreground">What would you like to build? <span className="text-red-500">*</span></label>
        <textarea 
          id="build" 
          name="build" 
          required 
          rows={4}
          value={formData.build}
          onChange={handleChange}
          className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors resize-y"
        ></textarea>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="problem" className="text-sm font-medium text-foreground">What problem are you trying to solve? <span className="text-red-500">*</span></label>
        <textarea 
          id="problem" 
          name="problem" 
          required 
          rows={4}
          value={formData.problem}
          onChange={handleChange}
          className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors resize-y"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm font-medium text-foreground">Estimated budget <span className="text-secondaryText font-normal">(optional)</span></label>
          <select 
            id="budget" 
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors"
          >
            <option value="">Select an option</option>
            <option value="< $5,000">Less than $5,000</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
            <option value="$25,000+">$25,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-sm font-medium text-foreground">Preferred timeline <span className="text-secondaryText font-normal">(optional)</span></label>
          <select 
            id="timeline" 
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors"
          >
            <option value="">Select an option</option>
            <option value="ASAP">As soon as possible</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
            <option value="No rush">No rush</option>
          </select>
        </div>
      </div>

      <div className="mt-4 pt-6 border-t border-border flex flex-col gap-4">
        <p className="text-xs text-secondaryText">
          By submitting this form, you agree to our <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>. We will never share your information.
        </p>
        <button 
          type="submit" 
          className="w-full bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
        >
          SEND PROJECT INQUIRY
        </button>
      </div>
    </form>
  );
}
