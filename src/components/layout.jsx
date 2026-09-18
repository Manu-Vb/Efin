import Header from "./header";
import Menu from "./menu";

function Layout({ usuario, children }) {

    return (

        <>

            <Header usuario={usuario} />

            <Menu />

            <main>

                {children}

            </main>

        </>

    );

}

export default Layout;