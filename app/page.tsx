

"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, FileText, BookOpen, Award, Phone, Mail, MessageCircle, 
  Star, Trophy, Zap, Menu, X, ChevronLeft, ChevronRight
} from 'lucide-react';

// Données du professeur 
const professorData = {
  name: "Serge Ghislain SAVI",
  photo: "/images/savi1.png",
  description: "Électrotechnicien avec plus de 15 ans d'expérience dans l'enseignement et la recherche. Passionné par la transmission du savoir et l'innovation technologique.",
  contact: {
    phone: "+229 0148484868",
    whatsapp: "+229 0196540120",
    email: "serge12savi@gmail.com"
  },
  specialties: [
    "Électronique de Puissance",
    "Systèmes Électriques Intelligents",
    "Automatisation Industrielle"
  ],
  cv: "/docs/cv_savi.pdf"
};

// Données des épreuves (inchangées)
const epreuves = [
  {
    id: 1,
    title: "1D2S Electro_Tle_LTCID_24-25",
    year: 2024-2025,
    subject: "Électrotechnique",
    description: "Première série des devoirs surveillés du second semestre",
    icon: "/images/1D2S Electro_Tle_LTCID_24-25.png",
    file: "/docs/1D2S Electro_Tle_LTCID_24-25.pdf"
  },
  {
    id: 2,
    title: "2D1S Electro Tle LTCID 24-25",
    year: 2022,
    subject: "Électrotechnique",
    description: "Deuxième série des devoirs surveillés du premier semestre",
    icon: "/images/2D1S Electro Tle LTCID 24-25.png",
    file: "/docs/2D1S Electro Tle LTCID 24-25.pdf"
  },
  {
    id: 3,
    title: "TD ELECTRO Tle F3 et EL 28 mars",
    year: 2025,
    subject: "Électrotechnique",
    description: "",
    icon: "/images/TD ELECTRO Tle F3 et EL 28 mars.png",
    file: "/docs/TD ELECTRO Tle F3 et EL 28 mars.pdf"
  },
  {
    id: 4,
    title: "TD EST Tle F3 28 mars",
    year: 2025,
    subject: "EST",
    description: "",
    icon: "/images/TD EST Tle F3 28 mars.png",
    file: "/docs/TD EST Tle F3 28 mars.pdf"
  },
  {
    id: 5,
    title: "TD MEL TLE F3",
    year: 2025,
    subject: "MEL",
    description: "TRAVAUX DE RENFORCEMENT DE CAPACITES DES APPRENANTS CANDIDATS AU CAP, DT ET BAC",
    icon: "/images/TD MEL TLE F3.png",
    file: "/docs/TD MEL TLE F3.pdf"
  },
  {
    id: 6,
    title: "TD TP 1ère F3",
    year: 2025,
    subject: "TP",
    description: "TRAVAUX DE RENFORCEMENT DE CAPACITES DES APPRENANTS CANDIDATS AU CAP, DT ET BAC",
    icon: "/images/TD TP 1ère F3.png",
    file: "/docs/TD TP 1ère F3.pdf"
  },
  {
    id: 7,
    title: "TD1 ELECTRO TERMO ARCHIMEDE",
    year: 2025,
    subject: "Électrotechnique",
    description: "",
    icon: "/images/TD1 ELECTRO TERMO ARCHIMEDE.png",
    file: "/docs/TD1 ELECTRO TERMO ARCHIMEDE.pdf"
  },
  {
    id: 8,
    title: "TD1 EST Archimède",
    year: 2025,
    subject: "EST",
    description: "",
    icon: "/images/TD1 EST Archimède.png",
    file: "/docs/TD1 EST Archimède.pdf"
  },
  {
    id: 9,
    title: "TD2 ELECTRO TERMO ARCHIMEDE",
    year: 2025,
    subject: "Électrotechnique",
    description: "",
    icon: "/images/TD2 ELECTRO TERMO ARCHIMEDE.png",
    file: "/docs/TD2 ELECTRO TERMO ARCHIMEDE.pdf"
  },
  {
    id: 10,
    title: "TD2 EST Archimède",
    year: 2025,
    subject: "EST",
    description: "",
    icon: "/images/TD2 EST Archimède.png",
    file: "/docs/TD2 EST Archimède.pdf"
  }           
];

// Nouvelles données pour Réalisations et Prix
const realisationsEtPrix = [
  {
    id: 1,
    type: 'prix',
    title: "Premier prix",
    date: "2024",
    description: "Camp d'excellence 2024",
    images: [
      "/images/Camp-excellentce-2024-1.jpeg",
      "/images/Camp-excellentce-2024-2.png",
      "/images/Camp-excellentce-2024-3.jpeg"
    ]
  },
  {
    id: 2,
    type: 'prix',
    title: "Premier prix",
    date: "2023",
    description: "Camp d'excellence de l'EFTP 2023",
    images: [
      "/images/Camp-excellentce-de-EFTP.jpeg"
    ]
  }
];

const ProfessorSite = () => {
  const [filter, setFilter] = useState('Tous');
  const [activeRealisationIndex, setActiveRealisationIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Nouvel état pour suivre l'image active dans chaque carousel
  const [activeImageIndices, setActiveImageIndices] = useState<{[key: number]: number}>({});

  // Initialiser les indices d'image active pour chaque réalisation/prix
  useEffect(() => {
    const initialIndices = realisationsEtPrix.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {} as {[key: number]: number});
    
    setActiveImageIndices(initialIndices);
  }, []);

  // Fonction pour passer à l'image suivante d'une réalisation spécifique
  const nextImage = (realisationId: number) => {
    setActiveImageIndices(prev => {
      const currentIndex = prev[realisationId] || 0;
      const maxIndex = realisationsEtPrix.find(item => item.id === realisationId)?.images.length || 1;
      return {
        ...prev,
        [realisationId]: (currentIndex + 1) % maxIndex
      };
    });
  };

  // Fonction pour passer à l'image précédente d'une réalisation spécifique
  const prevImage = (realisationId: number) => {
    setActiveImageIndices(prev => {
      const currentIndex = prev[realisationId] || 0;
      const maxIndex = realisationsEtPrix.find(item => item.id === realisationId)?.images.length || 1;
      return {
        ...prev,
        [realisationId]: (currentIndex - 1 + maxIndex) % maxIndex
      };
    });
  };

  // Changement automatique des images toutes les 5 secondes
  useEffect(() => {
    const timers = realisationsEtPrix.map(item => {
      return setInterval(() => {
        nextImage(item.id);
      }, 5000);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [activeImageIndices]);

  // Refs pour le défilement
  const epreuvesRef = useRef<HTMLDivElement>(null);
  const realisationsRef = useRef<HTMLDivElement>(null);

  // Fonction de défilement adaptée
  const scrollToSection = useCallback((sectionId: string) => {
    const sectionRefs = {
      'epreuves': epreuvesRef,
      'realisations': realisationsRef
    };

    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Ferme le menu mobile après le défilement
    }
  }, []);

  const subjects = ['Tous', ...new Set(epreuves.map(e => e.subject))];

  const filteredEpreuves = filter === 'Tous' 
    ? epreuves 
    : epreuves.filter(e => e.subject === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header Responsive */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-lg py-4 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-bold text-blue-800 flex items-center"
          >
            <BookOpen className="mr-2 md:mr-3 text-blue-600 w-5 h-5 md:w-6 md:h-6" />
            Serge SAVI
          </motion.h1>
          
          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-4">
            <button 
              onClick={() => scrollToSection('epreuves')}
              className="hover:text-blue-600 transition"
            >
              Épreuves
            </button>
            <button 
              onClick={() => scrollToSection('realisations')}
              className="hover:text-blue-600 transition"
            >
              Réalisations & Prix
            </button>
          </nav>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-800"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white shadow-md"
            >
              <nav className="flex flex-col items-center py-4 space-y-4">
                <button 
                  onClick={() => scrollToSection('epreuves')}
                  className=" hover:text-blue-600 transition"
                >
                  Épreuves
                </button>
                <button 
                  onClick={() => scrollToSection('realisations')}
                  className=" hover:text-blue-600 transition"
                >
                  Réalisations & Prix
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>


      {/* Section Profil Animée */}
      <motion.section 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              className="container mx-auto mt-16 px-4 mb-16"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                {/* Photo avec effet */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <img 
                    src={professorData.photo} 
                    alt="Professeur" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600 opacity-20 hover:opacity-0 transition-opacity"></div>
                </motion.div>
      
                {/* Détails du Profil */}
                <div className="p-8 flex flex-col justify-center">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold mb-4 text-blue-900"
                  >
                    {professorData.name}
                  </motion.h2>
                  
                  <p className="text-gray-600 mb-6">{professorData.description}</p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Award className="mr-2 text-blue-600" /> Domaines d'expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {professorData.specialties.map((specialty, index) => (
                        <motion.span 
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </motion.span>
                      ))}
                    </div>
                  </div>
      
                  <motion.a 
                    href={professorData.cv} 
                    download 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center w-fit shadow-lg"
                  >
                    <Download className="mr-2" /> Télécharger CV
                  </motion.a>
                </div>
              </div>
            </motion.section>

      
       {/* Section Épreuves */}
       <motion.section 
        ref={epreuvesRef}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-blue-900">Mes Épreuves</h2>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center"
                  >
                    <select 
                      value={filter} 
                      onChange={(e) => setFilter(e.target.value)}
                      className="border-2 border-blue-200 rounded-lg px-4 py-2 text-blue-800"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>
      
                <motion.div 
                  layout 
                  className="grid md:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {filteredEpreuves.map((epreuve) => (
                      <motion.div 
                        key={epreuve.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all"
                      >
                        <div className="flex items-center mb-4">
                          <img 
                            src={epreuve.icon} 
                            alt={epreuve.title} 
                            className="w-16 h-16 mr-4 rounded-lg"
                          />
                          <div>
                            <h3 className="font-bold text-blue-900">{epreuve.title}</h3>
                            <p className="text-gray-500">{epreuve.year} | {epreuve.subject}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{epreuve.description}</p>
                        <motion.a 
                          href={epreuve.file} 
                          download 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                        >
                          <FileText className="mr-2" /> Télécharger
                        </motion.a>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.section>


            <motion.section 
        ref={realisationsRef}
        id="realisations"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 my-16"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center">
            <Trophy className="mr-4 text-yellow-500" /> 
            Réalisations & Prix
          </h2>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {realisationsEtPrix.map((item) => (
              <motion.div 
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="bg-blue-50 rounded-2xl overflow-hidden shadow-lg border border-blue-100 hover:border-blue-300 transition-all"
              >
                <div className="relative h-64">
                  {/* Carousel d'images */}
                  <div className="relative w-full h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={`${item.id}-${activeImageIndices[item.id] || 0}`}
                        src={item.images[activeImageIndices[item.id] || 0]} 
                        alt={`${item.title} - Image ${(activeImageIndices[item.id] || 0) + 1}`} 
                        className="w-full h-64 object-cover"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                    
                    {/* Boutons de navigation */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage(item.id);
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full text-blue-800 hover:bg-white transition-all"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage(item.id);
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full text-blue-800 hover:bg-white transition-all"
                      aria-label="Image suivante"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    {/* Indicateurs de pagination */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
                      {item.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndices(prev => ({
                              ...prev,
                              [item.id]: index
                            }));
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            (activeImageIndices[item.id] || 0) === index
                              ? "bg-white w-4"
                              : "bg-white/50"
                          }`}
                          aria-label={`Aller à l'image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Overlay avec les informations */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                    <div className="flex items-center mb-1">
                      {item.type === 'prix' ? (
                        <Star className="mr-2 text-yellow-400" />
                      ) : (
                        <Zap className="mr-2 text-blue-400" />
                      )}
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-yellow-200">{item.date}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-700 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      


      {/* Footer Responsive */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-900 text-white py-6 mt-16"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
            <div className="flex items-center justify-center">
              <Phone className="mr-2 text-yellow-400" />
              <span>{professorData.contact.phone}</span>
            </div>
            <div className="flex items-center justify-center">
              <MessageCircle className="mr-2 text-yellow-400" />
              <span>{professorData.contact.whatsapp}</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="mr-2 text-yellow-400" />
              <span>{professorData.contact.email}</span>
            </div>
          </div>
          <p className="text-sm">&copy; 2025 Serge Savi - Tous droits réservés</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default ProfessorSite;