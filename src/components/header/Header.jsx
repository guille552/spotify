import React, { Component } from "react";
import axios from 'axios'
import "./Header.css";
import { Link, Navigate } from "react-router-dom";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default class Header extends Component {
    // searchParams = new URLSearchParams(window.location.search);
    // access_token = this.searchParams.get("access_token");
    access_token = localStorage.getItem('access_token');


    state = {
        dataPerfil: [],
        statusPerf: false,
        user: "",
        user2: "",
        seleccionPlaylists:"",
        seleccionEstadisticas:"",
    }

    componentDidMount = () => {
        // this.cambiarSeleccion()
        this.datosUsuario()
    }
    datosUsuario = () => {
        const headers = {
            headers: {
                "Authorization": "Bearer " + this.access_token
            }
        }
        axios.get("https://api.spotify.com/v1/me", headers).then(response => {
            const datos = response.data
            // console.log(datos);
            localStorage.setItem('user_id', datos.id);


            this.setState({
                dataPerfil: datos,
                statusPerf: true,
            })
        })
    }

    // *CERRAR SESION
    cerrarSesion = () => {
        localStorage.clear()
        return (<Navigate to="/" />)
    }
    // * ===============================================================================================
    render() {
        return (
            <div className="general">
                <div>
                    <div className="row mx-lg-5 mx-3" >
                        <div id="suppBar">
                            {
                                (this.state.statusPerf === true) && (
                                    <div>
                                        <div className="logOut" onClick={this.cerrarSesion} >
                                            <Link to="/">
                                                <FontAwesomeIcon icon={faRightFromBracket} className="mx-2 logOutIcono fa-2xl" />
                                            </Link>
                                            <Link to="/">
                                                <h1 className="logOutTexto" >Cerrar sesion</h1>
                                            </Link>
                                        </div>
                                        <div className="datosUsu">
                                            {
                                                (this.state.dataPerfil.images.length !== 0) &&
                                                (<img src={this.state.dataPerfil.images[0].url} alt="Avatar" className="imagenPerfil" />)
                                            }
                                            <h1 className="nombreUsu">
                                                {this.state.dataPerfil.display_name}
                                            </h1>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}