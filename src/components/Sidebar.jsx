import React, { useContext } from "react";
import {
  FaDonate,
  FaHome,
  FaRegWindowClose,
  FaUserAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { SidebarItem } from "./SidebarItem";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineVolunteerActivism } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { StoreContext, UserDTOValuesDefault } from "../context";

export function Sidebar({ active }) {
  const useStore = useContext(StoreContext);
  const { user, setUser } = useStore();

  return (
    <div className={`container-sidebar ${active}`}>
      <div className="content-sidebar">
        <Link to="/">
            <SidebarItem Icon={FaHome} Text="Home" />
        </Link>
        <Link to="/login">
            <SidebarItem Icon={FaUserAlt} Text="Login" />
        </Link> 
        <Link to="/cadastro-denuncia">
            <SidebarItem Icon={FaRegWindowClose} Text="Denuncias" />
        </Link>
        <Link to="/doacao">
            <SidebarItem Icon={FaDonate} Text="Doação" />
        </Link>
        <Link to="/cadastro-voluntario">
            <SidebarItem Icon={MdOutlineVolunteerActivism} Text="Voluntário" />
        </Link>

        {user.role !== undefined && user.role === "ADMIN" && (
          <Link to="/adm">
            <SidebarItem Icon={RiAdminFill} Text="Administração" />
          </Link>
        )}
        
        {user.id !== "" && (
          <div onClick={() => setUser(UserDTOValuesDefault)}>
            <SidebarItem Icon={RxExit} Text="Sair" />
          </div>
        )}
      </div>
    </div>
  );
}
