import Home from './components/Home';
import InsertRoot from './components/InsertRoot';
import QueryRoot from './components/QueryRoot';
import SummariesRoot from './components/SummariesRoot';
import About from './components/About';
import InsertShip from './components/ship/InsertShip';
import QueryShip from './components/ship/QueryShip';
import ShipInformation from './components/ship/ShipInformation';

const routes = [
  {path: "/", component: Home},
  {path: "/cadastrar", component: InsertRoot},
  {path: "/visualizar", component: QueryRoot},
  {path: "/relatorios", component: SummariesRoot},
  {path: "/sobre", component: About},
  {path: "/cadastrar/embarcacao", component: InsertShip},
  {path: "/visualizar/embarcacao", component: QueryShip},
  {path: "/visualizar/embarcacao/:id", component: ShipInformation},
];

export default routes;
