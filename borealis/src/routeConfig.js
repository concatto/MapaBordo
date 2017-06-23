import Home from './components/Home';
import InsertRoot from './components/InsertRoot';
import QueryRoot from './components/QueryRoot';
import SummariesRoot from './components/SummariesRoot';
import About from './components/About';
import InsertShip from './components/ship/InsertShip';
import InsertFish from './components/fish/InsertFish';
import ShipInformation from './components/ship/ShipInformation';
import PortInformation from './components/port/PortInformation';
import FishInformation from './components/fish/FishInformation';
import TripInformation from './components/trip/TripInformation';
import QueryShip from './components/ship/QueryShip';
import QueryPort from './components/port/QueryPort';
import QueryFish from './components/fish/QueryFish';
import QueryTrip from './components/trip/QueryTrip';
import GeneralSummary from './components/GeneralSummary';
import ShipSummary from './components/ShipSummary';
import FishSummary from './components/FishSummary';

const routes = [
  {path: "/", component: Home, title: "Borealis"},
  {path: "/cadastrar", component: InsertRoot, title: "Cadastrar dados"},
  {path: "/visualizar", component: QueryRoot, title: "Visualizar informações"},
  {path: "/relatorios", component: SummariesRoot, title: "Conferir relatórios"},
  {path: "/sobre", component: About, title: "Sobre"},
  {path: "/cadastrar/embarcacao", component: InsertShip, title: "Nova embarcação"},
  {path: "/cadastrar/especie", component: InsertFish, title: "Nova espécie"},
  {path: "/visualizar/embarcacao", component: QueryShip, title: "Visualizar embarcações"},
  {path: "/visualizar/porto", component: QueryPort, title: "Visualizar portos"},
  {path: "/visualizar/especie", component: QueryFish, title: "Visualizar espécies"},
  {path: "/visualizar/viagem", component: QueryTrip, title: "Visualizar viagens"},
  {path: "/visualizar/embarcacao/:id", component: ShipInformation, title: "Detalhes da embarcação"},
  {path: "/visualizar/porto/:id", component: PortInformation, title: "Detalhes do porto"},
  {path: "/visualizar/especie/:id", component: FishInformation, title: "Detalhes da espécie"},
  {path: "/visualizar/viagem/:id", component: TripInformation, title: "Detalhes da viagem"},
  {path: "/relatorios/geral", component: GeneralSummary, title: "Relatório geral"},
  {path: "/relatorios/embarcacoes", component: ShipSummary, title: "Relatório de embarcações"},
  {path: "/relatorios/especies", component: FishSummary, title: "Relatório de espécies"},
];

export default routes;
