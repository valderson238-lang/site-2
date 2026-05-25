import { useState, useEffect, FormEvent } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Check, 
  Menu, 
  X, 
  ShoppingBag, 
  Heart, 
  Sun, 
  Activity, 
  Baby, 
  ArrowRight, 
  Search, 
  Share2,
  Map,
  MessageCircle,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Shared type definitions
interface Store {
  id: 'cruz' | 'belacruz' | 'marco';
  name: string;
  address: string;
  phone: string;
  instagram: string;
  mapsUrl: string;
  whatsappMessage: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'shoes' | 'beach' | 'fitness' | 'kids'>('all');
  const [selectedStore, setSelectedStore] = useState<'belacruz' | 'marco' | 'cruz'>('cruz');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Custom interactive lead collection
  const [leadName, setLeadName] = useState('');
  const [leadPreference, setLeadPreference] = useState('Geral');
  const [leadStore, setLeadStore] = useState<'Cruz' | 'Bela Cruz' | 'Marco'>('Cruz');

  const stores: Record<string, Store> = {
    belacruz: {
      id: 'belacruz',
      name: 'Leleo Calçados — Bela Cruz',
      address: 'R. Humaitá, 514 - Centro | Bela Cruz, CE',
      phone: '+5588999054275', // Placeholder default
      instagram: 'leleocalcados',
      mapsUrl: 'https://maps.app.goo.gl/247o89RPQZJr4XPZA',
      whatsappMessage: 'Olá! Vim do site premium e gostaria de conferir calçados e novidades para a loja de Bela Cruz.'
    },
    marco: {
      id: 'marco',
      name: 'Leleo Calçados — Marco',
      address: 'Av. Prefeito Guido Osterno, 355 - Centro | Marco, CE',
      phone: '+5588999054275',
      instagram: 'leleocalcados',
      mapsUrl: 'https://maps.app.goo.gl/uRr6exhbQfobGH3S8',
      whatsappMessage: 'Olá! Vim do site e gostaria de falar com uma vendedora da loja de Marco.'
    },
    cruz: {
      id: 'cruz',
      name: 'Leleo Calçados — Cruz',
      address: 'R. Célso Araújo, 92 - Centro | Cruz, CE, 62595-000',
      phone: '++5588999054275',
      instagram: 'leleocalcados',
      mapsUrl: 'https://maps.google.com/?q=Leleo+Calcados+DE+CRUZ',
      whatsappMessage: 'Olá! Estou no site e desejo falar com a equipe de Cruz sobre os calçados e promoções.'
    }
  };

  // Live status calculation based on client context (with timezone target - CE Brazil - standard UTC-3)
  const getStoreStatus = (storeId: 'cruz' | 'belacruz' | 'marco') => {
    // Current UTC time state tracking
    const nowUtc = new Date();
    // Brazil/Ceara UTC-3 offset
    const brOffset = -3 * 60; // -180 minutes
    const localTime = new Date(nowUtc.getTime() + (nowUtc.getTimezoneOffset() + brOffset) * 60000);
    const day = localTime.getDay(); // 0: Sunday, 1: Mon, ..., 6: Sat
    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    // Convert schedules to minute ranges
    const amStart = 7 * 60 + 30;  // 07:30
    const amEnd = 12 * 60;       // 12:00
    const pmStart = 14 * 60 + 30; // 14:30
    const pmEnd = 18 * 60;       // 18:00
    const pmEndSat = 17 * 60 + 30; // 17:30

    if (storeId === 'belacruz' || storeId === 'marco') {
      // Mon-Fri schedule
      if (day >= 1 && day <= 5) {
        const isOpenAM = currentTimeInMinutes >= amStart && currentTimeInMinutes <= amEnd;
        const isOpenPM = currentTimeInMinutes >= pmStart && currentTimeInMinutes <= pmEnd;
        if (isOpenAM || isOpenPM) {
          return { status: 'Aberto', text: 'Aberto agora (Almoço de 12:00 às 14:30)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
        }
        return { status: 'Fechado', text: 'Fechado • Abre Segunda às 07:30', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      }
      // Saturady schedule
      else if (day === 6) {
        const isOpenAM = currentTimeInMinutes >= amStart && currentTimeInMinutes <= amEnd;
        const isOpenPM = currentTimeInMinutes >= pmStart && currentTimeInMinutes <= pmEndSat;
        if (isOpenAM || isOpenPM) {
          return { status: 'Aberto', text: 'Aberto agora (Sábado até às 17:30)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
        }
        return { status: 'Fechado', text: 'Fechado no momento (Sábado)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      }
      // Sunday
      else {
        return { status: 'Fechado', text: 'Fechado hoje (Domingo) • Abre Segunda às 07:30', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      }
    } else {
      // Cruz store schedule
      // Mon-Fri
      if (day >= 1 && day <= 5) {
        const isOpenAM = currentTimeInMinutes >= amStart && currentTimeInMinutes <= amEnd;
        const isOpenPM = currentTimeInMinutes >= pmStart && currentTimeInMinutes <= pmEnd;
        if (isOpenAM || isOpenPM) {
          return { status: 'Aberto', text: 'Aberto agora (Almoço das 12:00 às 14:30)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
        }
        return { status: 'Fechado', text: 'Fechado • Abre Segunda às 07:30', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      }
      // Sat
      else if (day === 6) {
        const isOpenAM = currentTimeInMinutes >= amStart && currentTimeInMinutes <= amEnd;
        if (isOpenAM) {
          return { status: 'Aberto', text: 'Aberto agora (Sábado somente de manhã até 12:00)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
        }
        return { status: 'Fechado', text: 'Fechado • Abre Domingo de manhã das 07:30 às 12:00', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      }
      // Sunday (Cruz store opens on Sundays!)
      else {
        const isOpenSun = currentTimeInMinutes >= amStart && currentTimeInMinutes <= amEnd;
        if (isOpenSun) {
          return { status: 'Aberto', text: 'Aberto agora (Domingo de manhã até 12:00)', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
        }
        return { status: 'Fechado', text: 'Fechado hoje • Abre Segunda às 07:30', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleWhatsAppRedirect = (e: FormEvent) => {
    e.preventDefault();
    const formattedName = leadName ? encodeURIComponent(leadName) : 'Cliente Especial';
    const message = `Olá! Meu nome é ${formattedName}. Estou visitando a Landing Page Premium e gostaria de receber novidades e o catálogo moderno de calçados e moda para a categoria *${leadPreference}* na loja de *${leadStore}*!`;
    const phoneCruz = '+5588999054275'; // Standard Leleo WhatsApp base for sales (Example real number/structure for action oriented interaction)
    window.open(`https://wa.me/${phoneCruz}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  // Showcase gallery items
  const galleryItems = [
    {
      id: 1,
      category: 'shoes',
      title: 'Papetes & Sandálias',
      tag: 'Leleo Calçados',
      img: 'https://lh3.googleusercontent.com/d/13LujEfpZ1_EgmsNT9ehh8BYjCkDVQGgq',
    },
    {
      id: 2,
      category: 'shoes',
      title: 'Looks Femininos',
      tag: 'Leleo Calçados',
      img: 'https://lh3.googleusercontent.com/d/1kHBaDKBitnjzjYKVAuYkYP4kPfWEhhSG',
    },
    {
      id: 3,
      category: 'beach',
      title: 'Sapatinhos para bebê',
      tag: 'Leleo Calçados',
      img: 'https://lh3.googleusercontent.com/d/1o8R8RsC8QX3irv6xBx-tI87nh7ek6_Uy',
    },
    {
      id: 4,
      category: 'fitness',
      title: 'Regatas Masculinas',
      tag: 'Leleo Calçados',
      img: 'https://lh3.googleusercontent.com/d/1MKyjle-GeuE2aYkrB_aU8ZHiQY3Mq--p',
    },
    {
      id: 5,
      category: 'kids',
      title: 'Nova coleção Kenner',
      tag: 'Leleo Calçados',
      img: 'https://lh3.googleusercontent.com/d/1eHXfe9CI19NFwZJawoLynwwbgjKMpdiC',
    },
    {
      id: 6,
      category: 'shoes',
      title: 'Moda Feminina',
      tag: 'Leleo Calçados',
      img: 'https://lh3.googleusercontent.com/d/1ZEGfUKeyItntHqaqxYsjRK57v-nZU9Ix',
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <div style={{ width: '100vw', overflowX: 'hidden' }} className="min-h-screen bg-[#070708] text-gray-100 font-sans selection:bg-gold-500 selection:text-black antialiased">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#070708]/80 border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="font-display font-extrabold text-2xl tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-gold-100 via-gold-300 to-gold-500 group-hover:from-white group-hover:to-gold-300 transition-all duration-300">
              LELEO
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] px-2 py-0.5 border border-gold-500/30 text-gold-300 rounded bg-gold-500/5 hidden sm:inline-block">
              Calçados & Moda
            </span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Elegant Abstract Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-left">


            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.95] text-white">
              Sua beleza em cada <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 block sm:inline">passo e estilo.</span>
            </h1>

            <p className="max-w-lg text-gray-300 text-base sm:text-lg leading-relaxed font-light">
              Mergulhe no universo luxuoso da Leleo Calçados. Uma curadoria brilhante de sapatos de design, moda praia vibrante, linha fitness premium de alta performance e looks infantis cheios de afeto e cuidado.
            </p>

            {/* CTA TRIGGERS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a 
                href="#catalogo" 
                className="px-8 py-4.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-black font-bold tracking-wide text-sm shadow-xl shadow-gold-500/10 hover:shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-3 group"
              >
                <span>Solicitar Catálogo Exclusivo</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#colecoes" 
                className="px-8 py-4.5 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all text-center"
              >
                Explorar Coleções
              </a>
            </div>

            {/* BRAND STATS GRID */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-white/5 max-w-lg">
              <div>
                <span className="block font-display font-extrabold text-2xl sm:text-3xl text-white">3</span>
                <span className="block text-xs text-gray-400 tracking-wide mt-1">Lojas Físicas</span>
              </div>
              <div>
                <span className="block font-display font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-200">24.8K+</span>
                <span className="block text-xs text-gray-400 tracking-wide mt-1">Seguidores</span>
              </div>
              <div>
                <span className="block font-display font-extrabold text-2xl sm:text-3xl text-white">19k+</span>
                <span className="block text-xs text-gray-400 tracking-wide mt-1">Inspirações</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HERO VISUAL WITH BENTO STYLING */}
          <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] flex items-center justify-center">
            
            {/* Elegant Background Glow */}
            <div className="absolute inset-5 bg-gradient-to-tr from-gold-950/20 to-gold-500/10 rounded-3xl blur-2xl -z-10" />

            {/* Core Generated Photo */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black">
              <img 
                src="https://lh3.googleusercontent.com/d/1CAJRTuUQzLYwAuwurjjsMG2WaYXH8s5j" 
                alt="Leleo Calçados Luxury Display" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay gradients styling */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              
              {/* Card visual elements */}
              <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-black/60 border border-white/10 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1">LELEO CALÇADOS</span>
                  <h3 className="font-display font-bold text-lg text-white">Beleza e Conforto para os seus Pés</h3>
                  <p className="text-xs text-gray-400">Encontre o modelo perfeito para o seu estilo com a qualidade que você merece.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold-500 text-black flex items-center justify-center font-bold shadow-lg shadow-gold-500/20">
                  ★
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* AUTHORITY MARQUEE */}
      <section className="bg-black/40 py-6 border-y border-white/5 overflow-hidden">
        <div className="w-full flex whitespace-nowrap overflow-hidden py-1 relative">
          {/* Subtle directional fading shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#070708] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#070708] to-transparent z-10 pointer-events-none" />

          {/* Moving Track */}
          <div className="flex gap-16 md:gap-24 animate-marquee shrink-0">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-16 md:gap-24 items-center shrink-0 tracking-widest text-xs font-mono uppercase text-gray-300 font-medium whitespace-nowrap">
                <span className="flex items-center gap-2 text-white font-bold">
                  ✨ LELEO CALÇADOS
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-gold-500">🔸</span> BELEZA E CONFORTO PARA OS SEUS PÉS
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-gold-500">🔸</span> TENDÊNCIAS EXCLUSIVAS
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-gold-500">🔸</span> ENVIAMOS PARA TODO O BRASIL
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS (Bento Grid) */}
      <section id="diferenciais" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-bold block">Por Que Caminhar Conosco?</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
            A Curadoria de Moda mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600 block sm:inline">Encantadora do Interior</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Não vendemos apenas sapatos e roupas. Entregamos a autoconfiança expressa em detalhes preciosos de estilo para cada geração da sua família.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 2: 2nd Small Bento (Social Influence & Trust) */}
          <div className="md:col-span-6 rounded-3xl bg-gradient-to-br from-[#121114] to-[#0a0a0c] border border-white/5 hover:border-gold-500/10 p-8 flex flex-col justify-between items-center text-center hover:scale-[1.01] transition-all relative">
            
            {/* Spark background layout */}
            <div className="absolute top-4 right-4 text-gold-500 opacity-20">
              <Instagram className="w-24 h-24" />
            </div>

            <div className="space-y-3.5 relative w-full">
              <div className="flex justify-center">
                <Instagram className="w-6 h-6 text-pink-500 hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="font-display font-bold text-xl text-white">Comunidade Apaixonada</h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                Acompanhe diariamente nossas novidades, provadores e combinações inspiradoras de tênis, saltos, sandálias e muito mais.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col space-y-3 w-full items-center">
              <div className="flex items-center gap-2 justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-gray-300 font-mono">19,5K posts publicados</span>
              </div>
              <a 
                href="https://www.instagram.com/leleocalcados/" 
                target="_blank" 
                className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider rounded-xl bg-gradient-to-r from-pink-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white shadow-md block"
                rel="noreferrer"
              >
                Seguir no Instagram
              </a>
            </div>
          </div>

          {/* Card 3: Small Bento (All ages) */}
          <div className="md:col-span-6 rounded-3xl bg-gradient-to-b from-[#0e0d10] to-[#070708] border border-white/5 hover:border-gold-500/10 p-8 flex flex-col justify-between relative overflow-hidden group">
            
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-300">
                <Baby className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-lg text-white">Família &amp; Multifuncional</h4>
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                Do look casual aos brinquedos educativos, passando por moda praia infantil e roupinhas de bebê. Atendemos todas as idades com a mesma excelência histórica.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
              <span>Moda Baby &amp; Kids</span>
              <span>Coleções Clássicas</span>
            </div>
          </div>



        </div>
      </section>

      {/* DETAILED CATEGORY SHOWCASE */}
      <section id="colecoes" className="py-24 bg-black/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-bold block">Galeria Premium</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-none">Nossa Curadoria dos Sonhos</h2>
              <p className="text-gray-400 text-sm max-w-lg font-light">
                Confira nossa seleção exclusiva e especial de itens de alta moda nacional e calçados premium de altíssima qualidade.
              </p>
            </div>
          </div>

          {/* DYNAMIC SHIFTING GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="group rounded-2xl overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/5 hover:border-gold-400/20 shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-gold-300 bg-black/60 px-2.5 py-1 border border-gold-500/20 backdrop-blur-sm rounded">
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-display font-semibold text-lg text-white group-hover:text-gold-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="pt-4 flex items-center justify-between border-t border-white/5 text-xs text-gray-500">
                      <span className="font-mono">Premium Choice</span>
                      <a 
                        href="#catalogo" 
                        onClick={() => {
                          setLeadPreference(item.title);
                          // Smooth scroll fallback
                          const select = document.getElementById('catalogo');
                          if (select) select.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-gold-400 font-bold tracking-wide hover:underline group-hover:text-white transition-colors"
                      >
                        Pedir Modelo
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>



      {/* INTERACTIVE STORES TIMETABLE & LOCATIONS */}
      <section id="lojas" className="py-24 bg-[#0a0a0c] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-bold block">Escolha Sua Loja Próxima</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">Nossos Endereços e Horários</h2>
            <p className="text-gray-400 text-sm font-light">
              Temos três centros de moda incríveis prontos para lhe receber. Selecione a unidade abaixo para ver o status em tempo real e os horários especiais do final de semana.
            </p>
          </div>

          {/* STORE TAB SELECTORS */}
          <div className="flex justify-center gap-3 mb-12">
            <button 
              onClick={() => setSelectedStore('cruz')}
              className={`px-6 py-3 rounded-xl font-display font-bold text-sm transition-all flex items-center gap-2 border cursor-pointer ${selectedStore === 'cruz' ? 'bg-gold-500 border-gold-500 text-black shadow-lg shadow-gold-500/10' : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Cruz (Matriz)</span>
            </button>
            <button 
              onClick={() => setSelectedStore('belacruz')}
              className={`px-6 py-3 rounded-xl font-display font-bold text-sm transition-all flex items-center gap-2 border cursor-pointer ${selectedStore === 'belacruz' ? 'bg-gold-500 border-gold-500 text-black shadow-lg shadow-gold-500/10' : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Bela Cruz</span>
            </button>
            <button 
              onClick={() => setSelectedStore('marco')}
              className={`px-6 py-3 rounded-xl font-display font-bold text-sm transition-all flex items-center gap-2 border cursor-pointer ${selectedStore === 'marco' ? 'bg-gold-500 border-gold-500 text-black shadow-lg shadow-gold-500/10' : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'}`}
            >
              <MapPin className="w-4 h-4" />
              <span>Marco</span>
            </button>
          </div>

          {/* TAB PANEL DISPLAY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-black/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            
            {/* Store Information Left Column */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {stores[selectedStore].name}
                  </h3>
                  
                  {/* Realtime Status computing */}
                  <span className={`px-3 py-1 text-xs rounded-full font-mono border ${getStoreStatus(selectedStore).color}`}>
                    ● {getStoreStatus(selectedStore).status}
                  </span>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm font-mono mt-3 uppercase tracking-wider flex items-center gap-2 text-gold-300 font-medium">
                  Status Atual: <span className="text-gray-200 normal-case font-sans">{getStoreStatus(selectedStore).text}</span>
                </p>

                <div className="space-y-4 mt-8 font-light text-sm sm:text-base">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Endereço de Boutique</p>
                      <p className="text-gray-400 text-xs sm:text-sm">{stores[selectedStore].address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Horários Certificados de Atendimento</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-xs text-gray-400 font-mono">
                        <div className="p-2.5 rounded bg-white/5 border border-white/5">
                          <p className="text-white font-semibold mb-1">Segunda à Sexta</p>
                          <p>Manhã: 07:30 às 12:00</p>
                          <p>Tarde: 14:30 às 18:00</p>
                        </div>
                        
                        <div className="p-2.5 rounded bg-white/5 border border-white/5">
                          <p className="text-white font-semibold mb-1">Finais de Semana</p>
                          {selectedStore === 'cruz' ? (
                            <>
                              <p>Sábado: 07:30 às 12:00 (Apenas)</p>
                              <p className="text-gold-300 font-semibold">Domingo: 07:30 às 12:00 (Abre!)</p>
                            </>
                          ) : (
                            <>
                              <p>Sábado Manhã: 07:30 às 12:00</p>
                              <p>Sábado Tarde: 14:30 às 17:30</p>
                              <p className="text-rose-400">Domingo: Fechado</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action items */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-4 border-t border-white/5">
                <a 
                  href={stores[selectedStore].mapsUrl} 
                  target="_blank" 
                  className="flex items-center gap-2 justify-center px-6 py-3.5 rounded-xl border border-gold-500/30 bg-gold-500/5 hover:bg-gold-500/10 text-gold-300 text-xs font-bold uppercase tracking-wider transition-all"
                  rel="noreferrer"
                >
                  <Map className="w-4 h-4 text-gold-400" />
                  <span>Ver Mapa no Google</span>
                </a>
                <a 
                  href={`https://wa.me/+5588999054275?text=${encodeURIComponent(stores[selectedStore].whatsappMessage)}`}
                  target="_blank"
                  className="flex items-center gap-2 justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
                  rel="noreferrer"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>WhatsApp da Loja</span>
                </a>
              </div>
            </div>

            {/* Store Map Representation on Right Column */}
            <div className="lg:col-span-5 relative w-full aspect-square lg:aspect-auto rounded-2xl overflow-hidden border border-white/10 min-h-[300px] flex items-center justify-center bg-zinc-950">
              
              {/* Premium Styled Map View Placeholder simulating high scale navigation coordinates */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none">
                <div className="flex items-center justify-between pointer-events-auto">
                  <span className="text-[9px] font-mono whitespace-nowrap bg-black/60 px-2.5 py-1 rounded text-gray-300 border border-white/10 uppercase tracking-widest flex items-center gap-1.5 backdrop-blur">
                    <Award className="w-3 h-3 text-gold-400" /> Unidade {selectedStore.toUpperCase()}
                  </span>
                  <button 
                    onClick={handleCopyLink}
                    className="p-1 px-2.5 rounded bg-black/80 border border-white/10 text-[9.5px] text-gray-400 hover:text-white transition-all backdrop-blur"
                  >
                    {copiedLink ? 'Copiado!' : 'Compartilhar'}
                  </button>
                </div>
                
                <div className="p-4 bg-zinc-950/90 border border-white/10 rounded-xl space-y-1 block pointer-events-auto">
                  <p className="text-xs font-bold text-white">Próximo aos Melhores Centros</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Clique em &ldquo;Ver Mapa no Google&rdquo; ao lado para abrir direções no GPS.</p>
                </div>
              </div>

              {/* Graphical simulation of map blueprint */}
              <div className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45 mix-blend-color-dodge grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')" }}></div>
              <div className="relative text-center space-y-4 px-6 z-10 pointer-events-auto">
                <div className="w-16 h-16 rounded-full bg-gold-400/20 border-2 border-gold-500 text-gold-300 flex items-center justify-center mx-auto text-xl animate-bounce">
                  📍
                </div>
                <div>
                  <h4 className="font-display font-medium text-white">{selectedStore === 'cruz' ? 'R. Célso Araújo, 92 - Centro' : selectedStore === 'belacruz' ? 'R. Humaitá, 514' : 'Av. Prefeito Guido Osterno, 355'}</h4>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedStore === 'cruz' ? 'Cruz, CE, 62595-000' : selectedStore === 'belacruz' ? 'Bela Cruz, CE' : 'Marco, CE'}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PERSUASIVE ORDER / CATALOG FORM SECTION */}
      <section id="catalogo" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="bg-gradient-to-br from-[#121114] via-[#09090b] to-[#0d0d0f] border border-white/10 rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#e2a849] font-bold block">Atendimento via WhatsApp</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
                Peça Novidades no Digital
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Digite seu nome e escolha o segmento de seu interesse. Nosso sistema preparará o canal de venda no WhatsApp correspondente com atendimento premium garantido em poucos cliques.
              </p>

              <div className="space-y-4 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gold-500/10 border border-gold-300/30 text-gold-300 flex items-center justify-center">✓</span>
                  <span>Sem robôs repetitivos: atendimento direto e carinhoso com nossas consultoras locais.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gold-500/10 border border-gold-300/30 text-gold-300 flex items-center justify-center">✓</span>
                  <span>Envios especiais para toda a região do Litoral Norte.</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE LEAD CAPTURE CARD */}
            <div className="lg:col-span-6">
              <form onSubmit={handleWhatsAppRedirect} className="bg-black/80 border border-white/5 p-6 sm:p-8 rounded-2xl space-y-5">
                <h3 className="font-display font-bold text-lg text-white">Dados da Consulta Premium</h3>
                
                <div className="space-y-2">
                  <label htmlFor="lead-name" className="block text-xs font-mono uppercase tracking-wider text-gray-400">Como podemos lhe chamar?</label>
                  <input 
                    id="lead-name"
                    type="text" 
                    placeholder="Seu nome completo" 
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                    className="w-full bg-[#111113] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-all font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="lead-pref" className="block text-xs font-mono uppercase tracking-wider text-gray-400">Qual o seu interesse?</label>
                    <select 
                      id="lead-pref"
                      value={leadPreference} 
                      onChange={(e) => setLeadPreference(e.target.value)}
                      className="w-full bg-[#111113] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-gold-500 transition-all font-sans cursor-pointer"
                    >
                      <option value="Geral">Curadoria Geral</option>
                      <option value="Calçados Finos">Calçados de Luxo</option>
                      <option value="Moda Praia">Moda Praia</option>
                      <option value="Moda Fitness">Roupas Fitness</option>
                      <option value="Baby e Infantil">Looks Infantis</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lead-store" className="block text-xs font-mono uppercase tracking-wider text-gray-400">Sua Loja Favorita?</label>
                    <select 
                      id="lead-store"
                      value={leadStore} 
                      onChange={(e) => setLeadStore(e.target.value as 'Cruz' | 'Bela Cruz' | 'Marco')}
                      className="w-full bg-[#111113] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-gold-500 transition-all font-sans cursor-pointer"
                    >
                      <option value="Cruz">Cruz (Matriz)</option>
                      <option value="Bela Cruz">Bela Cruz</option>
                      <option value="Marco">Marco</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold tracking-wide text-xs uppercase transition-transform active:scale-95 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Iniciar Atendimento VIP</span>
                  </button>
                  <p className="text-[10px] text-gray-500 text-center mt-3 font-mono">
                    Conectar com o WhatsApp da Loja {leadStore} • Resposta Rápida
                  </p>
                </div>
              </form>
            </div>

          </div>

        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-black/80 py-12 border-t border-white/5 text-gray-500 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-xl tracking-wider text-white">LELEO CALÇADOS</h3>
            <p className="text-xs text-gray-400 leading-normal font-light">
              A Leleo Calçados traz o melhor da moda e do conforto para os seus pés, combinando qualidade indiscutível com atendimento exclusivo. Nossa maior recompensa é a felicidade estampada nos rostos e pés dos nossos estimados clientes de Cruz, Bela Cruz e Marco, CE.
            </p>
            <div className="flex items-center gap-4 text-gray-400 pt-2">
              <a href="https://www.instagram.com/leleocalcados/" target="_blank" className="hover:text-white transition-all" rel="noreferrer">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#lojas" className="hover:text-white transition-all">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4">Nossas Unidades</h4>
            <ul className="text-xs space-y-2 font-light text-gray-400">
              <li><strong className="font-medium text-gray-300">Cruz:</strong> R. Celso Araújo, 92 - Centro</li>
              <li><strong className="font-medium text-gray-300">Bela Cruz:</strong> R. Humaitá, 514 - Centro</li>
              <li><strong className="font-medium text-gray-300">Marco:</strong> Av Prefeito Guido Osterno, 355</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4">Acesso Rápido</h4>
            <ul className="text-xs space-y-2 text-gray-400">
              <li><a href="#colecoes" className="hover:text-white transition-all">Coleções</a></li>
              <li><a href="#lojas" className="hover:text-white transition-all">Horários e Contatos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4">Instagram Live Feed</h4>
            <p className="text-xs text-gray-400 font-light mb-3">Siga @leleocalcados e receba as tendências mais desejadas de calçados do momento.</p>
            <a 
              href="https://www.instagram.com/leleocalcados/" 
              target="_blank" 
              className="inline-block px-4 py-2 bg-white/5 border border-white/10 hover:border-gold-500/30 text-[10px] uppercase font-mono tracking-wider font-semibold rounded text-white text-center transition-all"
              rel="noreferrer"
            >
              24,8K Seguidores
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 text-center text-xs text-gray-600 flex flex-col sm:flex-row justify-between gap-4 font-mono">
          <p>&copy; 2026 Leleo Calçados. Todos os direitos reservados.</p>
          <p>Luxo, Moda & Tradição Cearense.</p>
        </div>
      </footer>

    </div>
  );
}
