import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global'

export default class Menu extends Component {

    state = {
        series: []
    }

    getSeries = () => {
        let request = 'api/Series'

        axios.get(Global.apiSeries + request).then(response => {
            this.setState({
                series: response.data
            })
        })

    }

    componentDidMount = () => {
        this.getSeries();
    }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <i className="fas fa-car me-2" style={{ color: 'white', fontSize: '1.5rem' }}></i>
            <img style={{width: '75px'}} src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Netflix.png" alt="logo " />
          </NavLink>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/personajesNew">
                  Nuevo Personaje
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to='/personajesPut'>
                  Modificar Personaje
                </NavLink>
              </li>

              {/* Opción de Series con menú desplegable */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/#"
                  id="seriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Series
                </a>
                <ul className="dropdown-menu" aria-labelledby="seriesDropdown">
                    {
                        this.state.series.map((serie, index) => {
                            return(
                                <li key={index}><NavLink className="dropdown-item" to={`/seriesView/${serie.idSerie}`}>{serie.nombre}</NavLink></li>
                            )
                        })
                    }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
