import React from 'react';
import { PageHeader, Panel } from 'react-bootstrap';

class About extends React.Component {
  componentDidMount() {
    document.title = "Sobre";
  }

  render() {
    const links = {
      gmail: "fernandoconcatto@gmail.com",
      univali: "fernandoconcatto@edu.univali.br",
      github: "https://github.com/concatto"
    };

    return (
      <div>
        <PageHeader>Sobre o Projeto Borealis</PageHeader>
        <Panel>
          <p>
            Este projeto foi desenvolvido pelo acadêmico Fernando Concatto,
            como critério parcial para a aprovação na disciplina de Banco de Dados I,
            ministrada pelo professor Marcelo Magnani, na Universidade do Vale do Itajaí - campus Itajaí.
          </p>
          <br/>
          <p>
            Em caso de dúvidas, críticas, elogios ou outros assuntos, entre em contato com
            o autor através de um dos seguintes meios:
          </p>
          <a href={"mailto:" + links.gmail}>
            {links.gmail}
          </a><br/>
          <a href={"mailto:" + links.univali}>
            {links.univali}
          </a><br/>
          <a href={links.github}>
            {links.github}
          </a><br/>
        </Panel>
      </div>
    );
  }
}

export default About;
