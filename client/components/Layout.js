import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import FooterContacts from "./FooterContacts";

const Layout = ({children}) => {
  return (
           <Container>
              {children}
             <FooterContacts />
           </Container>
         );
};
export default Layout;