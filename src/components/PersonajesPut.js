import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';

export default class PersonajesPut extends Component {
    inpPersonaje = React.createRef();
    inpSerie = React.createRef();

    state = {
        series: [],
        personajes: [],
        serie: null,
        personaje: null,
        editado: -1
    }

    getSeries = () => {
        let request = 'api/Series';

        axios.get(Global.apiSeries + request)
            .then(response => {
                this.setState({
                    series: response.data
                });
            })
            .catch(error => console.error("Error fetching series:", error));
    }

    getPersonajes = () => {
        let request = 'api/Personajes';

        axios.get(Global.apiSeries + request)
            .then(response => {
                this.setState({
                    personajes: response.data
                });
            })
            .catch(error => console.error("Error fetching personajes:", error));
    }

    insertPersonaje = (e) => {
        e.preventDefault();
        let idPersonaje = this.inpPersonaje.current.value;
        let idSerie = this.inpSerie.current.value;

        let request = `api/Personajes/${idPersonaje}/${idSerie}`;

        axios.put(Global.apiSeries + request)
            .then(response => {
                this.setState({
                    editado: parseInt(idSerie)
                });
            })
            .catch(error => console.error("Error updating personaje:", error));
    }

    componentDidMount = () => {
        this.getSeries();
        this.getPersonajes();
        this.setState({
            editado: -1
        });
    }

    serieChange = () => {
        let idSerie = this.inpSerie.current.value;

        if (idSerie) {
            let request = `api/Series/${idSerie}`;
            axios.get(Global.apiSeries + request)
                .then(response => {
                    this.setState({
                        serie: response.data
                    });
                })
                .catch(error => console.error("Error fetching serie:", error));
        }
    }

    personajeChange = () => {
        let idPersonaje = this.inpPersonaje.current.value;

        if (idPersonaje) {
            let request = `api/Personajes/${idPersonaje}`;
            axios.get(Global.apiSeries + request)
                .then(response => {
                    this.setState({
                        personaje: response.data
                    });
                })
                .catch(error => console.error("Error fetching personaje:", error));
        }
    }

    render() {
        return (
            <div className="container mt-5">
                <h1 className="text-center mb-4">Modificar Personaje</h1>

                <form onSubmit={this.insertPersonaje} className="card p-4 shadow-sm">  
                    <div className="row">  
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Serie</label>
                            <select onChange={this.serieChange} className="form-control" ref={this.inpSerie} required>
                                {this.state.series.map((serie) => (
                                    <option key={serie.idSerie} value={serie.idSerie}>
                                        {serie.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row">  
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Personaje</label>
                            <select onChange={this.personajeChange} className="form-control" ref={this.inpPersonaje} required>
                                {this.state.personajes.map((personaje) => (
                                    <option key={personaje.idPersonaje} value={personaje.idPersonaje}>
                                        {personaje.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
    
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary w-50">Modificar Personaje</button>
                    </div>
                </form>
                <div className="row">
                    {this.state.serie && (
                        <div className="col-6 text-center p-5" id="imgPersonaje">
                            <h2>{this.state.serie.nombre}</h2>
                            <hr />
                            <img className='w-100' src={this.state.serie.imagen} alt={this.state.serie.nombre} />
                        </div> 
                    )}
                    {this.state.personaje && (
                        <div className="col-6 text-center p-5" id="imgSerie">
                        <h2>{this.state.personaje.nombre}</h2>
                        <hr />
                        <img className='w-100' src={this.state.personaje.imagen} alt={this.state.personaje.nombre} />
                    </div>
                    )}
                </div>

                {this.state.editado !== -1 && (
                    <Navigate to={`/personajesView/${this.state.editado}`} />
                )}
            </div>
        );
    }
}
