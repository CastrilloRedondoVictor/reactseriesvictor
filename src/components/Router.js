import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import SeriesView from './SeriesView'
import PersonajesView from './PersonajesView'
import PersonajesNew from './PersonajesNew'
import PersonajesPut from './PersonajesPut'

export default class Router extends Component {
    render() {

        function GetIdSeriesView () {
            let {id} = useParams()
            return <SeriesView id={id} />
        }

        function GetIdPersonajesView () {
            let {id} = useParams()
            return <PersonajesView id={id} />
        }
    
        // function GetIdDCocheGet () {
        //   let {id} = useParams()
        //   return <CochesGet id={id} />
        // }
    
        // function GetIdCocheDelete () {
        //   let {id} = useParams()
        //   return <CochesDelete id={id} />
        // }
    
        return (
            <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/seriesView/:id' element={ <GetIdSeriesView /> } />
                <Route path='/personajesView/:id' element={ <GetIdPersonajesView /> } />
                <Route path='/personajesNew/' element={ <PersonajesNew /> } />
                <Route path='/personajesPut/' element={ <PersonajesPut /> } />
                {/* <Route path='/new' element={ <CochesInsert /> } />
                <Route path='/edit/:id' element={ <GetIdDCochePut /> } />
                <Route path='/get/:id' element={ <GetIdDCocheGet /> } />
                <Route path='/delete/:id' element={ <GetIdCocheDelete /> } /> */}
            </Routes>
          </BrowserRouter>
        )
      }
}
