import Home from './components/Home';
import InsertRoot from './components/InsertRoot';
import QueryRoot from './components/QueryRoot';
import SummariesRoot from './components/SummariesRoot';
import About from './components/About';
import InsertShip from './components/ship/InsertShip';
import QueryShip from './components/ship/QueryShip';
import ShipInformation from './components/ship/ShipInformation';
import QueryPort from './components/port/QueryPort';
import QueryFish from './components/fish/QueryFish';
import QueryTrip from './components/trip/QueryTrip';

const routes = [
  {path: "/", component: Home, title: "Borealis"},
  {path: "/cadastrar", component: InsertRoot, title: "Cadastrar dados"},
  {path: "/visualizar", component: QueryRoot, title: "Visualizar informações"},
  {path: "/relatorios", component: SummariesRoot, title: "Conferir relatórios"},
  {path: "/sobre", component: About, title: "Sobre"},
  {path: "/cadastrar/embarcacao", component: InsertShip, title: "Nova embarcação"},
  {path: "/visualizar/embarcacao", component: QueryShip, title: "Visualizar embarcações"},
  {path: "/visualizar/embarcacao/:id", component: ShipInformation, title: "Detalhes da embarcação"},
  {path: "/visualizar/porto", component: QueryPort, title: "Visualizar portos"},
  {path: "/visualizar/especie", component: QueryFish, title: "Visualizar espécies"},
  {path: "/visualizar/viagem", component: QueryTrip, title: "Visualizar viagens"},
];

export default routes;
