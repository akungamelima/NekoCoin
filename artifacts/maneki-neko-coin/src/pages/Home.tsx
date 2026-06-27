import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Copy, ExternalLink, Menu, X } from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "How to Buy", id: "how-to-buy" },
    { name: "Tokenomics", id: "tokenomics" },
    { name: "Roadmap", id: "roadmap" },
    { name: "Community", id: "community" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")} data-testid="nav-logo">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 overflow-hidden">
              <img src="/maneki-neko-coin.png" alt="MNC Logo" className="w-8 h-8 object-cover" />
            </div>
            <span className="font-serif text-xl font-bold tracking-wider text-primary">MNC</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  data-testid={`nav-link-${link.id}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 rounded-full"
              data-testid="nav-buy-btn"
              onClick={() => scrollTo("how-to-buy")}
            >
              Buy MNC
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="nav-mobile-toggle"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/5 py-4 px-4 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-base font-medium text-foreground/80 hover:text-primary py-2 border-b border-white/5"
                data-testid={`mobile-nav-link-${link.id}`}
              >
                {link.name}
              </button>
            ))}
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold w-full mt-2 rounded-full"
              data-testid="mobile-nav-buy-btn"
              onClick={() => scrollTo("how-to-buy")}
            >
              Buy MNC
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center text-center gap-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-4"
          >
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full glow-gold flex items-center justify-center bg-black"
            >
              <img 
                src="/maneki-neko-coin.png" 
                alt="Maneki Neko Coin" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4 items-center max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium tracking-wide">
              <span>GOOD FORTUNE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-50" />
              <span>PROSPERITY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-50" />
              <span>LUCK</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white text-glow leading-tight">
              Maneki Neko Coin
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl font-light">
              The luckiest token on Solana. Bring prosperity to your wallet with the ultimate Japanese fortune cat meme coin.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all"
              onClick={() => scrollTo("how-to-buy")}
              data-testid="hero-buy-btn"
            >
              Buy Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/30 text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6 rounded-full bg-background/50 backdrop-blur-sm"
              onClick={() => scrollTo("about")}
              data-testid="hero-learn-btn"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-black/40 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">What is MNC?</h2>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Maneki Neko Coin ($MNC) is a luck-powered community token launched on Solana. Inspired by the traditional Japanese lucky cat symbol—known globally to bring fortune and prosperity to its owner.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                While other coins rely on hype, MNC relies on ancient, proven luck. We are building a prosperous community where everyone holds a piece of good fortune.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <img src="/maneki-neko-coin.png" alt="MNC Coin" className="w-3/4 h-3/4 object-contain opacity-80" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section id="how-to-buy" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">How to Buy</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Summoning your fortune is easy. Follow these simple steps to get your hands on $MNC.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Create Wallet", desc: "Download Phantom or Solflare wallet from the app store or browser extension." },
              { step: "02", title: "Get Some SOL", desc: "Buy Solana (SOL) on an exchange and send it to your new wallet address." },
              { step: "03", title: "Swap for MNC", desc: "Go to Raydium or Jupiter, connect your wallet, and paste the MNC token address." },
              { step: "04", title: "HODL for Luck", desc: "Keep your MNC secure in your wallet and let the Maneki Neko bring you prosperity." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-primary/30 transition-all h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 text-7xl font-serif font-black text-white/5 group-hover:text-primary/10 transition-colors -mt-4 -mr-2">{item.step}</div>
                  <CardContent className="p-6 pt-10 flex flex-col gap-4 relative z-10">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-foreground/70">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 max-w-2xl mx-auto bg-black/60 border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex-1 w-full">
              <p className="text-xs text-primary mb-1 font-medium">Contract Address</p>
              <p className="text-sm font-mono text-white/90 truncate bg-white/5 px-3 py-2 rounded-lg border border-white/10 w-full overflow-hidden">
                MNCXluck8888prosperity9999fortune7777sol
              </p>
            </div>
            <Button 
              variant="outline" 
              className="shrink-0 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
              onClick={() => {
                navigator.clipboard.writeText("MNCXluck8888prosperity9999fortune7777sol");
                alert("Contract address copied!");
              }}
              data-testid="copy-ca-btn"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy CA
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-24 px-4 bg-black/40 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Tokenomics</h2>
            <p className="text-xl font-medium text-primary mb-2">Total Supply: 1,000,000,000 MNC</p>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">A fair and prosperous distribution designed for long-term luck.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square max-w-md mx-auto w-full flex items-center justify-center"
            >
              {/* Fake visual chart made with CSS */}
              <div className="w-full h-full rounded-full border-[20px] border-primary/10 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-t-primary border-r-primary rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-b-secondary rotate-[-15deg]"></div>
                <div className="absolute inset-0 rounded-full border-[20px] border-transparent border-l-white/20 rotate-[15deg]"></div>
                
                <div className="text-center">
                  <span className="block text-3xl font-bold text-white">1B</span>
                  <span className="block text-sm text-primary uppercase tracking-widest mt-1">SUPPLY</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              {[
                { percent: "50%", label: "Community & Liquidity", color: "bg-primary" },
                { percent: "20%", label: "Development", color: "bg-secondary" },
                { percent: "15%", label: "Marketing", color: "bg-white/40" },
                { percent: "10%", label: "Team (Locked 1yr)", color: "bg-white/20" },
                { percent: "5%", label: "Charity & Burns", color: "bg-destructive/80" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center font-bold text-background shrink-0`}>
                    {item.percent}
                  </div>
                  <div className="font-medium text-white/90 text-lg">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">The Path to Prosperity</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Our roadmap to bringing luck to the entire blockchain.</p>
          </motion.div>

          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 md:border-none">
            {/* Desktop timeline line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary/20 -translate-x-1/2"></div>
            
            {[
              { phase: "Phase 1", title: "Launch & Community Building", desc: "Token launch, initial marketing push, website release, and gathering the first 10,000 lucky holders." },
              { phase: "Phase 2", title: "Exchange Listings", desc: "CoinGecko & CoinMarketCap listings, initial CEX listings, and global marketing campaigns." },
              { phase: "Phase 3", title: "Partnerships & Utility", desc: "Strategic partnerships in Web3, exclusive NFT collection for holders, and staking for luck." },
              { phase: "Phase 4", title: "Ecosystem Expansion", desc: "Major Tier 1 Exchange listings, real-world charity donations, and expanding the Maneki Neko brand." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 pl-8 md:pl-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full ring-4 ring-background shadow-[0_0_10px_rgba(212,175,55,0.8)] z-10 mt-6 md:mt-0"></div>
                
                <div className={`flex-1 w-full ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <Card className="bg-white/5 border-white/10 hover:border-primary/30 transition-colors inline-block w-full text-left">
                    <CardContent className="p-6">
                      <div className="text-primary font-bold text-sm tracking-widest uppercase mb-2">{item.phase}</div>
                      <h3 className="text-2xl font-bold text-white mb-3 font-serif">{item.title}</h3>
                      <p className="text-foreground/70">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24 px-4 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/japanese-sayagata.png')] opacity-10 mix-blend-overlay"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center gap-8"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-serif font-bold">
              招
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Join the Lucky Cult</h2>
            <p className="text-lg text-foreground/80 max-w-2xl">
              Our community is the heart of Maneki Neko Coin. Join us on our socials to stay updated on the latest news, giveaways, and luck-bringing events.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mt-8">
              {[
                { name: "Telegram", users: "25K+", url: "#" },
                { name: "Twitter / X", users: "40K+", url: "#" },
                { name: "Discord", users: "15K+", url: "#" }
              ].map((social, i) => (
                <a key={i} href={social.url} className="group block" data-testid={`social-link-${social.name.toLowerCase().replace(/ \/ /g, '-')}`}>
                  <Card className="bg-black/40 border-primary/20 group-hover:border-primary group-hover:bg-primary/10 transition-all h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center gap-3 text-center">
                      <div className="text-xl font-bold text-white group-hover:text-primary transition-colors">{social.name}</div>
                      <div className="text-sm text-foreground/60">{social.users} Members</div>
                      <ExternalLink className="w-4 h-4 text-primary/50 group-hover:text-primary mt-2" />
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Wisdom & Answers</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "What is Maneki Neko Coin ($MNC)?", a: "MNC is a meme coin built on the Solana blockchain, inspired by the Japanese lucky cat. It represents good fortune, prosperity, and a strong community spirit." },
                { q: "What blockchain is MNC on?", a: "MNC is launched on the Solana blockchain for lightning-fast transactions and extremely low fees." },
                { q: "How can I buy MNC?", a: "You can buy MNC on decentralized exchanges like Raydium and Jupiter by swapping SOL for MNC using a Solana-compatible wallet like Phantom." },
                { q: "Are the liquidity pool tokens locked?", a: "Yes, 100% of the initial liquidity pool tokens have been burned, ensuring a rug-proof and secure environment for all holders." },
                { q: "Does the coin have any utility?", a: "While initially launching as a pure meme coin focused on community, our Phase 3 roadmap includes staking features and exclusive NFT utility for holders." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10 px-2 data-[state=open]:bg-white/5 transition-colors rounded-lg mb-2">
                  <AccordionTrigger className="text-left text-lg font-medium text-white hover:text-primary hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 text-base pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <img src="/maneki-neko-coin.png" alt="MNC Logo" className="w-10 h-10 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              <span className="font-serif text-2xl font-bold text-white/50">MNC</span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm font-medium">Telegram</a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm font-medium">Twitter</a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm font-medium">DexScreener</a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm font-medium">CoinGecko</a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>&copy; 2025 Maneki Neko Coin. All rights reserved.</p>
            <p className="max-w-xl text-center md:text-right">
              Disclaimer: $MNC is a meme coin created for entertainment purposes. It has no intrinsic value or expectation of financial return. Please invest responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
