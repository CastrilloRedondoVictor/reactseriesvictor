import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

export default class PersonajesPut extends Component {
    inpPersonaje = React.createRef();
    inpSerie = React.createRef();
  
    state = {
        series: [],
        personajes: [],
        editado: false
    }

    getSeries = () => {
        let request = 'api/Series'

        axios.get(Global.apiSeries + request).then(response => {
            this.setState({
                series: response.data
            })
        })
    }

    getPersonajes = () => {
        let request = 'api/Personajes'

        axios.get(Global.apiSeries + request).then(response => {
            this.setState({
                personajes: response.data
            })
        })
    }
  
    insertPersonaje = (e) => {
      e.preventDefault();
      let idPersonaje = this.inpPersonaje.current.value
      let idSerie = this.inpSerie.current.value
  
      let request = 'api/Personajes/' + idPersonaje + '/' + idSerie
  
      axios.put(Global.apiSeries + request).then(response => {
        this.setState({
          editado: true
        })
      })
    }
  
    componentDidMount = () => {
        this.getSeries();
        this.getPersonajes();
      this.setState({
        editado: false
      })
    }
  
    render() {
        return (
          <div className="container mt-5">
            <h1 className="text-center mb-4">Modificar Personaje</h1>
    
            <form onSubmit={this.insertPersonaje} className="card p-4 shadow-sm">  
              <div className="row">  
                <div className="col-md-12 mb-3">
                  <label className="form-label">Personaje</label>
                  <select className="form-control" ref={this.inpPersonaje} required>
                      {
                          this.state.personajes.map((personaje, index) => {
                              return(
                                  <option value={personaje.idPersonaje}>{personaje.nombre}</option>
                              )
                          })
                      }
                  </select>
                </div>
              </div>
    
              <div className="row">  
                <div className="col-md-12 mb-3">
                  <label className="form-label">Serie</label>
                  <select className="form-control" ref={this.inpSerie} required>
                      {
                          this.state.series.map((serie, index) => {
                              return(
                                  <option value={serie.idSerie}>{serie.nombre}</option>
                              )
                          })
                      }
                  </select>
                </div>
              </div>
    
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary w-50">Modificar Personaje</button>
              </div>
            </form>
    
            {
              this.state.editado &&
              (<Navigate to='/' />)
            }
          </div>
        )
      }
}
