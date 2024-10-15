"use client";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Lock, Shield, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const sections = ["home", "recursos", "artigos", "faq"];
    const scrollPos = window.scrollY;

    sections.forEach((section) => {
      const sectionElement = document.getElementById(section);

      if (!sectionElement) {
        return;
      }
      if (
        sectionElement.offsetTop <= scrollPos + 10 &&
        sectionElement.offsetTop + sectionElement.offsetHeight > scrollPos + 10
      ) {
        setActiveSection(section);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="mx-0 px-4 w-full py-4 backdrop-blur-sm flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/BoaSenhaIcon.png" alt="Logo" width={40} height={40} />
            <a
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 inline-block text-transparent bg-clip-text"
            >
              BoaSenha
            </a>
          </div>
          <div className="hidden md:flex text-white space-x-6">
            {["home", "recursos", "artigos", "faq"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`hover:text-purple-600 font-semibold transition-colors ${
                  activeSection === section
                    ? "text-purple-600"
                    : "text-purple-400"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
          <Link href="/login">
          <button className="hidden md:block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
            Começar
          </button>
          </Link>
          <button className="md:hidden text-purple-400" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <a href="#home" className="block px-4 py-2 hover:bg-purple-100">
              Home
            </a>
            <a href="#recursos" className="block px-4 py-2 hover:bg-purple-100">
              Recursos
            </a>
            <a href="#faq" className="block px-4 py-2 hover:bg-purple-100">
              FAQ
            </a>
            <a href="#artigos" className="block px-4 py-2 hover:bg-purple-100">
              Artigos
            </a>
            <Link href="/login" className="block px-4 py-2 bg-purple-600 text-white">
              Começar
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/HomeBoaSenha.png"
            alt="Background Image"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw,"
            className="w-full h-full object-cover blur-[3px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl text-white md:text-6xl font-bold mb-6">
              Guarde suas <span className="text-purple-500">senhas</span>,
              proteja sua vida <span className="text-purple-500">digital</span>.
            </h1>
            <p className="sm:text-xl text-gray-300 mb-8">
              Gerencie todas as suas senhas com segurança e facilidade. Nunca
              mais esqueça ou comprometa suas credenciais online.
            </p>
            <Link href="/login">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors">
              Experimente gratuitamente
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Importance of Password Management */}
      <section id="recursos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que gerenciar suas senhas é crucial
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Lock className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Segurança aprimorada
              </h3>
              <p>
                Proteja-se contra hackers e violações de dados com senhas únicas
                e fortes para cada conta.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Conveniência</h3>
              <p>
                Acesse todas as suas senhas em um só lugar, eliminando a
                necessidade de memorizar múltiplas credenciais.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Key className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Geração de senhas fortes
              </h3>
              <p>
                Crie senhas complexas e únicas automaticamente para maximizar a
                segurança de suas contas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Recommendations */}
      <section id="artigos" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Artigos recomendados
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://www.alura.com.br/artigos/assets/o-que-e-como-usar-gerenciador-senhas/o-que-e-como-usar-gerenciador-de-senhas.jpg`}
                alt={`Artigo`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  O que é e como usar um gerenciador de senhas?
                </h3>
                <p className="text-gray-600 mb-4">
                  Nesse artigo vamos conhecer um pouco sobre uma ferramenta
                  muito útil para essa tarefa.
                </p>
                <a
                  href="https://www.alura.com.br/artigos/o-que-e-como-usar-gerenciador-de-senhas"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Ler mais
                </a>
              </div>
            </div>
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`https://www.reitec.net.br/wp-content/uploads/2024/04/Gerenciamento-de-Senhas_-As-Melhores-Praticas-para-Manter-suas-Credenciais-Seguras.png`}
                  alt={`Artigo`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                  Senhas seguras: tudo o que você precisa saber para se proteger
                  </h3>
                  <p className="text-gray-600 mb-4">
                  Descubra como criar senhas fortes e seguras e proteger suas contas com técnicas avançadas de segurança digital.
                  </p>
                  <a
                    href="https://www.diazerosecurity.com.br/pt/blog/senhas-seguras-tudo-o-que-voce-precisa-saber-para-se-proteger"
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Ler mais
                  </a>
                </div>
              </div>
              <div
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`https://hubativo.com/wp-content/uploads/2021/06/Gestao-de-Passwords-em-Empresas-thegem-blog-default.jpg`}
                  alt={`Artigo`}
                  className="w-full h-48 object-contain"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                  Gestão de passwords em empresas
                  </h3>
                  <p className="text-gray-600 mb-4">
                  Neste artigo iremos falar da importância da política de gerenciamento de senhas para as empresas.
                  </p>
                  <a
                    href="https://hubativo.com/gestao-de-passwords-em-empresas/"
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Ler mais
                  </a>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl mx-auto">
            {[
              {
                q: "O que é um gerenciador de senhas?",
                a: "Um gerenciador de senhas é uma ferramenta que armazena e gerencia suas senhas online de forma segura, permitindo que você use senhas únicas e fortes para cada conta sem precisar memorizá-las.",
              },
              {
                q: "Como o gerenciador de senhas mantém minhas informações seguras?",
                a: "Nosso gerenciador de senhas usa criptografia para proteger suas informações. Apenas você tem acesso às suas senhas, nem mesmo nossa equipe pode vê-las.",
              },
              {
                q: "Posso acessar minhas senhas em diferentes dispositivos?",
                a: "Sim, você pode sincronizar suas senhas em todos os seus dispositivos, incluindo smartphones, tablets e computadores.",
              },
              {
                q: "O gerenciador de senhas pode gerar senhas fortes para mim?",
                a: "Sim, nosso gerenciador inclui um gerador de senhas que cria senhas complexas e únicas com base nos critérios que você definir.",
              },
              {
                q: "E se eu esquecer a senha mestra do meu gerenciador de senhas?",
                a: "Estamos desenvolvendo a funcionalidade de redefinição de senha, mas é crucial que você lembre sua senha mestra, pois ela é a chave para todas as suas outras senhas.",
              },
              {
                q: "O gerenciador de senhas é compatível com todos os sites e aplicativos?",
                a: "Nosso gerenciador é projetado para funcionar com a maioria dos sites e aplicativos. Em casos raros de incompatibilidade, nossa equipe está pronta para ajudar.",
              },
            ].map((faq, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-gray-800 text-white py-7">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 pb-4 border-b border-gray-700">
            <div>
              <h3 className="text-xl font-semibold mb-4">BoaSenha</h3>
              <p>Protegendo sua vida digital, uma senha de cada vez.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Artigos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Documentação
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Seção de Avatares da Equipe */}
          <div className="mt-4 ">
            <h4 className="text-lg font-semibold mb-4 text-center">
              Nossa Equipe
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* Exemplos de avatares */}
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={`https://via.placeholder.com/100`} // Substitua pelo URL da imagem do avatar
                    alt={`Avatar ${index + 1}`}
                    className="w-24 h-24 rounded-full mb-2"
                  />
                  <p className="text-sm">Nome da Pessoa {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 BoaSenha. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
