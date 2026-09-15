import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're trying to accomplish and we'll help you figure out the next step.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-8 py-20 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Copy */}
        <div className="flex-1 lg:max-w-xl flex flex-col gap-6">
          <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-foreground uppercase">
            Let&apos;s build something.
          </h1>
          <p className="text-secondaryText text-lg leading-relaxed">
            You don&apos;t need a technical plan. Tell us what you&apos;re trying to accomplish and we&apos;ll help you figure out the next step.
          </p>
          
          <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
            <h2 className="font-display tracking-widest text-xs text-foreground uppercase">Other ways to reach us</h2>
            <p className="text-secondaryText text-sm">
              Email: <a href="mailto:hello@byldspace.com" className="text-foreground hover:underline">hello@byldspace.com</a>
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="flex-1 bg-surface border border-border p-6 md:p-10 rounded-sm">
          <form className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
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
                className="bg-background border border-border p-3 rounded-sm text-sm focus:outline-none focus:border-foreground transition-colors resize-y"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="text-sm font-medium text-foreground">Estimated budget <span className="text-secondaryText font-normal">(optional)</span></label>
                <select 
                  id="budget" 
                  name="budget"
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
        </div>
      </div>
    </div>
  );
}
