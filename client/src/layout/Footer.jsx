import { Input } from "./Input";
import { Icon } from "./Icon";
import { Button } from "./Button";

import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <section className="footer">
      <div className="social">
        <Icon icon={faInstagram} />
        <Icon icon={faLinkedin} />
        <Icon icon={faFacebook} />
        <Icon icon={faWhatsapp} />
      </div>
      <div className="vertical-row"></div>
      <div className="info">
        <form className="contact-us">
          <Input type="text" placeholder="name" />
          <Input type="eamil" placeholder="email" />
          <Input type="text" placeholder="message" />
          <Button content="Mail Us!" />
        </form>
      </div>
    </section>
  );
};

export default Footer;
