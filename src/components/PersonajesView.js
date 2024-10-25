import axios from 'axios'
import React, { Component } from 'react'
import Global from '../Global'
import { NavLink } from 'react-router-dom'

export default class PersonajesView extends Component {


    state = {
        personajes: []
    }

    getPersonajes = () => {
        let request = 'api/Personajes'
        let aux = []

        axios.get(Global.apiSeries + request).then(response => {
            response.data.forEach(personaje => {
                if(personaje.idSerie === parseInt(this.props.id)){
                    console.log(personaje)
                    aux.push(personaje)
                }
            });
            this.setState({
                personajes: aux
            })
        })
    }

    componentDidMount = () => {
        this.getPersonajes();
    }

  render() {
    return (
      <div>
        <h1>Personajes de {this.props.id}</h1>

        <div className="container text-center mt-5">
        <h1 className="text-center mb-4">Personajes de {this.props.id}</h1>
        <NavLink className='btn btn-danger w-50 m-3' to={`/seriesView/${this.props.id}`}>Volver a serie {this.props.id}</NavLink>
        <ul className="list-group">
          {this.state.personajes.map((personaje, index) => (
            <li key={index} className="list-group-item d-flex align-items-center">
              <img 
                src={personaje.imagen} 
                alt={`Imagen de ${personaje.nombre}`} 
                className="rounded-circle me-3" 
                style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
              />
              <span style={{ fontSize: '1.2rem' }}>{personaje.nombre}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    )
  }
}
