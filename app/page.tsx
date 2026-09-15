import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-space z-0"></div>
        <div className="absolute w-[600px] h-[600px] rounded-full border border-border opacity-20 -top-48 -right-48 animate-spin-slow pointer-events-none"></div>
        <div className="absolute w-[800px] h-[800px] rounded-full border border-border opacity-10 -bottom-64 -left-48 pointer-events-none"></div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 py-20 flex flex-col items-center text-center max-w-4xl">
          <div className="mb-8 space-y-4">
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-foreground">
              BYLD <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">SPACE</span>
            </h1>
            <p className="font-display tracking-[0.3em] text-xs md:text-sm text-secondaryText uppercase">
              Ideas · Applications · Real Solutions
            </p>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
            Have an idea?<br />
            Let&apos;s build what comes next.
          </h2>
          
          <p className="text-secondaryText text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            You don&apos;t need to understand the technology. 
            Tell us what you want to achieve, and we&apos;ll help turn your idea 
            into a practical digital solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
            >
              START A PROJECT
            </Link>
            <Link 
              href="/projects" 
              className="inline-flex items-center justify-center border border-border bg-surface text-foreground px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:border-foreground/30 hover:bg-background transition-colors"
            >
              EXPLORE OUR WORK
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-surface relative border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">What We Do</h2>
            <p className="text-3xl md:text-4xl font-display">Technology explained through outcomes, not complexity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="border border-border bg-background p-8 hover:border-foreground/20 transition-colors flex flex-col h-full group">
              <h3 className="font-display tracking-widest text-xs text-secondaryText uppercase mb-6">Software Development</h3>
              <h4 className="text-xl font-medium mb-4 text-foreground group-hover:text-white transition-colors">Turn your idea into a working digital product.</h4>
              <p className="text-secondaryText text-sm mb-8 flex-grow leading-relaxed">
                From websites and internal tools to custom applications, we help turn ideas into simple, reliable solutions built around what you actually need.
              </p>
              <Link href="/services/software-development" className="text-sm font-semibold tracking-wider text-foreground hover:text-secondaryText transition-colors flex items-center gap-2">
                Tell Us Your Idea <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="border border-border bg-background p-8 hover:border-foreground/20 transition-colors flex flex-col h-full group">
              <h3 className="font-display tracking-widest text-xs text-secondaryText uppercase mb-6">Cloud Deployment</h3>
              <h4 className="text-xl font-medium mb-4 text-foreground group-hover:text-white transition-colors">Make your application ready for the real world.</h4>
              <p className="text-secondaryText text-sm mb-8 flex-grow leading-relaxed">
                We help prepare, launch, and maintain your application online so your customers and team can access it reliably.
              </p>
              <Link href="/services/cloud-deployment" className="text-sm font-semibold tracking-wider text-foreground hover:text-secondaryText transition-colors flex items-center gap-2">
                Learn More <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="border border-border bg-background p-8 hover:border-foreground/20 transition-colors flex flex-col h-full group">
              <h3 className="font-display tracking-widest text-xs text-secondaryText uppercase mb-6">Data Engineering</h3>
              <h4 className="text-xl font-medium mb-4 text-foreground group-hover:text-white transition-colors">Turn your information into something useful.</h4>
              <p className="text-secondaryText text-sm mb-8 flex-grow leading-relaxed">
                We help organize and connect your business information so you can understand it better and make smarter decisions.
              </p>
              <Link href="/services/data-engineering" className="text-sm font-semibold tracking-wider text-foreground hover:text-secondaryText transition-colors flex items-center gap-2">
                Learn More <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            {/* Service 4 */}
            <div className="border border-border bg-background p-8 hover:border-foreground/20 transition-colors flex flex-col h-full group">
              <h3 className="font-display tracking-widest text-xs text-secondaryText uppercase mb-6">AI Development</h3>
              <h4 className="text-xl font-medium mb-4 text-foreground group-hover:text-white transition-colors">Use AI where it actually makes sense.</h4>
              <p className="text-secondaryText text-sm mb-8 flex-grow leading-relaxed">
                We help explore practical ways AI can save time, improve experiences, and support the way your business works.
              </p>
              <Link href="/services/ai-development" className="text-sm font-semibold tracking-wider text-foreground hover:text-secondaryText transition-colors flex items-center gap-2">
                Learn More <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            {/* Service 5 */}
            <div className="border border-border bg-background p-8 hover:border-foreground/20 transition-colors flex flex-col h-full group lg:col-span-2">
              <h3 className="font-display tracking-widest text-xs text-secondaryText uppercase mb-6">Tech Consultation</h3>
              <h4 className="text-xl font-medium mb-4 text-foreground group-hover:text-white transition-colors">Not sure what you need yet?</h4>
              <p className="text-secondaryText text-sm mb-8 flex-grow leading-relaxed max-w-2xl">
                Start with a conversation. Tell us your idea, challenge, or goal and we&apos;ll help you understand your options before you commit to building anything.
              </p>
              <Link href="/services/tech-consultation" className="text-sm font-semibold tracking-wider text-foreground hover:text-secondaryText transition-colors flex items-center gap-2">
                Book a Consultation <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden bg-grid">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16">
            <h2 className="font-display text-xs tracking-[0.2em] text-secondaryText mb-4 uppercase">The Process</h2>
            <p className="text-3xl md:text-4xl font-display max-w-xl">How it works.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            <div className="relative pl-8 border-l border-border">
              <div className="absolute left-[-17px] top-0 bg-background border border-border w-8 h-8 rounded-full flex items-center justify-center font-display text-xs">01</div>
              <h3 className="text-lg font-medium mb-2">Tell Us Your Idea</h3>
              <p className="text-sm text-secondaryText">Explain the problem, idea, or goal in your own words.</p>
            </div>
            
            <div className="relative pl-8 border-l border-border">
              <div className="absolute left-[-17px] top-0 bg-background border border-border w-8 h-8 rounded-full flex items-center justify-center font-display text-xs">02</div>
              <h3 className="text-lg font-medium mb-2">We Explore</h3>
              <p className="text-sm text-secondaryText">We discuss what is possible and identify the best approach.</p>
            </div>
            
            <div className="relative pl-8 border-l border-border">
              <div className="absolute left-[-17px] top-0 bg-background border border-border w-8 h-8 rounded-full flex items-center justify-center font-display text-xs">03</div>
              <h3 className="text-lg font-medium mb-2">We Plan</h3>
              <p className="text-sm text-secondaryText">We define what needs to be built, expected outcomes, timeline, and requirements.</p>
            </div>
            
            <div className="relative pl-8 border-l border-border">
              <div className="absolute left-[-17px] top-0 bg-background border border-border w-8 h-8 rounded-full flex items-center justify-center font-display text-xs">04</div>
              <h3 className="text-lg font-medium mb-2">We Build</h3>
              <p className="text-sm text-secondaryText">The solution is designed, developed, tested, and improved.</p>
            </div>
            
            <div className="relative pl-8 border-l border-border">
              <div className="absolute left-[-17px] top-0 bg-background border border-border w-8 h-8 rounded-full flex items-center justify-center font-display text-xs">05</div>
              <h3 className="text-lg font-medium mb-2">We Launch</h3>
              <p className="text-sm text-secondaryText">Once everything is ready, we help bring the solution online.</p>
            </div>
            
            <div className="relative pl-8 border-l border-border">
              <div className="absolute left-[-17px] top-0 bg-background border border-border w-8 h-8 rounded-full flex items-center justify-center font-display text-xs text-foreground bg-surface">06</div>
              <h3 className="text-lg font-medium mb-2">We Improve</h3>
              <p className="text-sm text-secondaryText">The journey doesn&apos;t have to stop after launch. Solutions can continue evolving as needs change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">
            Ready to get started?
          </h2>
          <p className="text-secondaryText text-lg mb-10">
            Send us a message and let&apos;s talk about what you want to build.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-sm font-bold tracking-[0.1em] text-sm hover:bg-accent transition-colors"
          >
            SEND PROJECT INQUIRY
          </Link>
        </div>
      </section>
    </div>
  );
}
