import axios from 'axios'
import React, { Component } from 'react'
import Global from '../Global'
import { NavLink } from 'react-router-dom'

export default class SeriesView extends Component {

    state = {
        serie: null
    }

    getSerie = () => {
        let request = 'api/Series/' + this.props.id

        axios.get(Global.apiSeries + request).then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount = () => {
        this.getSerie();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.id !== this.props.id){
            this.getSerie();
        }
    }

    render() {
        return (
          <div className="container mt-5">
            <h1 className="text-center mb-4">Detalles de la serie {this.props.id}</h1>
            {
              this.state.serie && (
                <div className="card shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img 
                        src={this.state.serie.imagen} 
                        className="img-fluid rounded-start" 
                        style={{ maxWidth: '100%', height: 'auto' }} 
                        alt={`Serie ${this.state.serie.nombre}`} 
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{this.state.serie.nombre}</h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item"><strong>ID:</strong> {this.state.serie.idSerie}</li>
                          <li className="list-group-item"><strong>Puntuación:</strong> {this.state.serie.puntuacion}</li>
                          <li className="list-group-item"><strong>Año:</strong> {this.state.serie.anyo}</li>
                        </ul>
                        <div className="mt-3">
                          <NavLink className="btn btn-primary" to={`/personajesView/${this.state.serie.idSerie}`}>
                            Personajes
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        );
      }
      
}
