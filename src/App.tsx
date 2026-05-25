import { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  ChevronRight, 
  Star, 
  Sparkles, 
  Check, 
  X, 
  ShoppingBag, 
  MessageCircle, 
  Award 
} from 'lucide-react';

export default function App() {
  // Estado para a foto ampliada (Modal)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Link do WhatsApp configurado com o número: 88 99905-4275
  const whatsappUrl = "https://wa.me/5588999054275?text=Ol%C3%A1%21+Gostaria+de+conhecer+o+cat%C3%A1logo+da+Leleo+Cal%C3%A7ados.";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased">
      
      {/* TOPO / HEADER */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-amber-500">LELEO CALÇADOS</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#colecoes" className="hover:text-white transition">Coleções</a>
            <a href="#sobre" className="hover:text-white transition">Sobre Nós</a>
            <a href="#contato" className="hover:text-white transition">Contato</a>
          </nav>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            <MessageCircle size={16} />
            <span>Fale Conosco</span>
          </a>
        </div>
      </header>

      <main>
        {/* SEÇÃO PRINCIPAL (HERO) */}
        <section className="relative py-20 overflow-hidden border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-xs text-neutral-400">
                <Sparkles size={12} className="text-amber-500" />
                <span>Nova Coleção de Outono/Inverno</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                Sua beleza em cada <span className="text-amber-500">passo e estilo.</span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-400 max-w-xl">
                Mergulhe no universo luxuoso da Leleo Calçados. Uma curadoria brilhante de sapatos de design, moda praia vibrante, linha fitness premium de alta performance e looks infantis cheios de afeto e cuidado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-amber-500/10"
                >
                  <span>Solicitar Catálogo Exclusivo</span>
                  <ChevronRight size={16} />
                </a>
                <a 
                  href="#colecoes"
                  className="flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-6 py-3 rounded-xl font-medium transition"
                >
                  Explorar Coleções
                </a>
              </div>
              
              {/* Estatísticas simples */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-neutral-900">
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">Lojas Físicas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">24.8K+</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">Seguidores</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">19k+</p>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider">Inspirações</p>
                </div>
              </div>
            </div>

            {/* Imagem de Destaque da Logo */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 relative group shadow-2xl">
                <img 
                  src="/src/assets/images/leleo_header.png" 
                  alt="Leleo Calçados" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 cursor-pointer"
                  onClick={() => setSelectedImage('/src/assets/images/leleo_header.png')}
                  onError={(e) => {
                    // Fallback se a imagem local não carregar antes do deploy final
                    e.currentTarget.src = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Leleo Calçados</span>
                  <h3 className="text-lg font-bold text-white">Beleza e Conforto para os seus Pés</h3>
                  <p className="text-xs text-neutral-400 mt-1">Encontre o modelo perfeito para o seu estilo com a qualidade que você merece.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VITRINE / SEÇÕES (Exemplo simplificado para manter o foco) */}
        <section id="colecoes" className="py-20 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nossos Segmentos</h2>
            <p className="text-neutral-400">Trabalhamos com o melhor da moda para garantir estilo e elegância em qualquer ocasião.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Calçados Femininos', 'Moda Praia', 'Linha Fitness', 'Moda Infantil'].map((item, index) => (
              <div key={index} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
                    <ShoppingBag size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item}</h3>
                  <p className="text-sm text-neutral-400 mt-2">Modelos exclusivos e selecionados a dedo para o seu guarda-roupa.</p>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-amber-500 hover:text-amber-400 pt-4">
                  <span>Ver modelos no WhatsApp</span>
                  <ChevronRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO SOBRE NÓS */}
        <section id="sobre" className="py-20 bg-neutral-900/40 border-y border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sobre a Leleo Calçados</h2>
              <p className="text-neutral-400">
                Somos apaixonados por trazer tendências que unem alta sofisticação e o máximo bem-estar. Atendemos com muito amor toda a família, oferecendo desde opções deslumbrantes para festas até o vestuário ideal para os seus treinos e momentos de lazer na praia.
              </p>
              <div className="space-y-3">
                {[
                  'Atendimento personalizado via WhatsApp',
                  'Entrega rápida e segura na sua região',
                  'Produtos com garantia de qualidade e conforto'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                      <Check size={12} />
                    </div>
                    <span className="text-sm text-neutral-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center space-y-2">
                <Award className="text-amber-500 mx-auto" size={32} />
                <h4 className="font-bold text-white text-sm">Qualidade Premium</h4>
                <p className="text-xs text-neutral-500">Materiais selecionados com foco em durabilidade.</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-center space-y-2">
                <Clock className="text-amber-500 mx-auto" size={32} />
                <h4 className="font-bold text-white text-sm">Atendimento Ágil</h4>
                <p className="text-xs text-neutral-500">Respostas rápidas para tirar todas as suas dúvidas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE CONTATO / RODAPÉ */}
        <section id="contato" className="py-20 max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Deseja fazer um pedido ou visitar nossa loja?</h2>
              <p className="text-neutral-400">Clique no botão para falar com nossa equipe de vendas diretamente no WhatsApp e garantir suas peças exclusivas.</p>
              <div className="pt-4 space-y-3 text-sm text-neutral-400">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-amber-500" />
                  <span>(88) 99905-4275</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-amber-500" />
                  <span>Venha nos visitar em uma de nossas lojas físicas</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-self-stretch lg:justify-self-end w-full max-w-sm">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold p-4 rounded-xl transition text-center shadow-lg"
              >
                <MessageCircle size={20} />
                <span>Chamar no WhatsApp Agora</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium p-4 rounded-xl transition text-center"
              >
                <Instagram size={20} className="text-pink-500" />
                <span>Siga-nos no Instagram</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 py-8 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} Leleo Calçados. Todos os direitos reservados.</p>
      </footer>

      {/* MODAL DE IMAGEM AMPLIADA */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-neutral-900/50 p-2 rounded-full transition">
            <X size={24} />
          </button>
          <img src={selectedImage} alt="Ampliada" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
        </div>
      )}

    </div>
  );
}
