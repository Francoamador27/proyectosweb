import logo from "/assets/logo-simple.png";
import { navItems } from "../constants";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [MobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!MobileDrawerOpen);
  };
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
            <a href="/#" className="flex items-center flex-shrink-0">
            <img className="h-10 w-20 mr-2" src={logo} alt="logo" />
            <span className="text-xl tracking-tight">ProyectosWeb</span>
            </a>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="https://api.whatsapp.com/send/?phone=5493513873029&text=Hola!%20👋%20Estoy%20interesado%20en%20una%20p%C3%A1gina%20web%20para%20mi%20negocio%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n.%20%C2%BFPodr%C3%ADas%20ayudarme?
"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Contáctanos
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {MobileDrawerOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
        {MobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
            <a
              href="https://api.whatsapp.com/send/?phone=5493513873029&text=Hola!%20👋%20Estoy%20interesado%20en%20una%20p%C3%A1gina%20web%20para%20mi%20negocio%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n.%20%C2%BFPodr%C3%ADas%20ayudarme?
"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Contáctanos
            </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
