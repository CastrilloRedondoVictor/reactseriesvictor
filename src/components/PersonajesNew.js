import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class PersonajesNew extends Component {
    inpNombre = React.createRef();
    inpImagen = React.createRef();
    inpSerie = React.createRef();
  
    state = {
        series: [],
        creado: -1
    }

    getSeries = () => {
        let request = 'api/Series'

        axios.get(Global.apiSeries + request).then(response => {
            this.setState({
                series: response.data
            })
        })
    }
  
    insertPersonaje = (e) => {
      e.preventDefault();

      let nombre = this.inpNombre.current.value
      let imagen = this.inpImagen.current.value
      let idSerie = this.inpSerie.current.value
  
      let data = {
        idPersonaje: 0,
        nombre: nombre,
        imagen: imagen,
        idSerie: parseInt(idSerie),
      }

      console.log(data)
  
      let request = 'api/Personajes'
  
      axios.post(Global.apiSeries + request, data).then(response => {
        this.setState({
          creado: idSerie
        })
      })
    }
  
    componentDidMount = () => {
        this.getSeries();
      this.setState({
        creado: -1
      })
    }
  
    render() {
      return (
        <div className="container mt-5">
          <h1 className="text-center mb-4">Crear Personaje</h1>
  
          <form onSubmit={this.insertPersonaje} className="card p-4 shadow-sm">
            <div className="row">
  
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" ref={this.inpNombre} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Imagen (URL)</label>
                <input type="text" className="form-control" ref={this.inpImagen} required />
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
              <button type="submit" className="btn btn-primary w-50">Añadir Personaje</button>
            </div>
          </form>
  
          {
            this.state.creado !== -1 &&
            (<Navigate to={`/personajesView/${this.state.creado}`} />)
          }
        </div>
      )
    }
}
