import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import ReactWhatsapp, { FloatingWhatsApp } from 'react-floating-whatsapp';
import logo from "/assets/logo-simple.png";
const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4">Información</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a className="text-neutral-300 hover:text-white" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Servicios</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a className="text-neutral-300 hover:text-white" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Conectá con nosotros</h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a className="text-neutral-300 hover:text-white" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>



      <FloatingWhatsApp
        phoneNumber="3513873029"
        accountName="ProyectosWeb"
        avatar={logo} // reemplazá con tu logo cuadrado
        chatMessage="¡Hola! 😊 ¿Tenés una idea para tu hacer crecer tu empresa?  Nos ocupamos de hacerla realidad"
        placeholder="Escribí tu consulta acá..."
        statusMessage="Desarrollamos el sitio web para tu empresa"
        darkMode={true}
        allowClickAway={true}
        allowEsc={true}
        notification={true}
        notificationSound={false}
        notificationLoop={3}
        messageDelay={1}
        notificationDelay={10}
        chatboxHeight={380}
        className="floating-wsp"
        chatboxClassName="floating-wsp-chat"
        buttonStyle={{
          boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
        }}
        chatboxStyle={{
          backgroundColor: '#1a1a1a',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
        }}
      />

    </footer>
  );
};

export default Footer;
