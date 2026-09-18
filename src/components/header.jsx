import "../styles/components/header.css";

function Header({ usuario }) {

    return (

        <header className="header">

            <img
                src="/img/logotipo definitivo.jpg"
                className="logo"
                alt="EFIN"
            />

            <div>

                <h1>EFIN</h1>

                <p className="subtitulo">
                    Sistema de gestión institucional
                </p>

                <p>{usuario}</p>

            </div>

            <div className="logos-extra">

                <img
                    src="/img/ieLasnieves.png"
                    alt="Institución Educativa Las Nieves"
                />

                <img
                    src="/img/universidad.png"
                    alt="Universidad aliada"
                />

            </div>

        </header>

    );

}

export default Header;