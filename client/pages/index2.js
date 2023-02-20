import Link from "next/link";
// import { useContext } from "react";
import { Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import ImageMain from "./ImageMain";
import HeaderIndex from "../components/HeaderIndex";

const Index2 = () => {
  return (
    <Layout>
      <HeaderIndex />
        <div style={{marginLeft: "20px", marginRight: "20px"}}>
            <h3>Добро пожаловать на сайт игры "Камень-ножницы-бумага"</h3>
            <p>Правила игры очень просты: <br/>
            В игре могут участвовать два и более игрока. Игроки одновременно сжимают в кулак одну из своих рук, 
            трясут кулаками 2-3 секунды, произнося «раз-два-три» или «цу-е-фа», затем разжимают кулаки 
            и показывают друг другу с помощью пальцев руки один из трех знаков — камень, 
            ножницы или бумагу. Камень — сжатый кулак, ножницы — распрямленные указательный 
            и средний пальцы руки, бумага — раскрытая ладонь.</p>
            <p>Победитель определяется по правилам:<ul>
                <li>камень побеждает ножницы (камень затупляет ножницы);</li>
                <li>ножницы побеждают бумагу (ножницы разрезают бумагу);</li>
                <li>бумага побеждает камень (бумага заворачивает камень);</li>
                <li>ничья, если у всех игроков одновременно показан одинаковый знак.</li>
                    </ul></p>
                 <p>В нашем случаем вы сможете играть с Роботом, который будет противопоставлять вам рандом выбор (камень, ножницы или бумагу)</p>   
            </div>
        <Message positive>
    <Message.Header>Для начала игры вам необходимо подключить Metamask</Message.Header>
    <p>
      Убедитесь, что у вас установлен
      <Link href="https://metamask.io/">
        <b> Metamask </b></Link>
        и вы перешли в тестовую сеть <b>Goerli</b>.
    </p>
  </Message>
  <ImageMain />
    </Layout>
  );
};
export default Index2;