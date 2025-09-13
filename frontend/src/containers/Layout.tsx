import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC = () => {

  return (<>
      <Header />
      <main>
        <Outlet />
      </main>
			<footer className="page-footer">
				<p>Designed & Developed by <a href="https://breakerino.me" target="_blank">Breakerino<span>.</span></a></p>
			</footer>
  </>)

}

export default Layout;