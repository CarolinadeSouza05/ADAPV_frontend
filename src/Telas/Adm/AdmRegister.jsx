import { HeaderAdm } from "../../components/HeaderAdm";
import { AsideAdm } from "./AsideAdm";

export function AdmRegister(){
    return(
        <main className="container-main-adm">
            <AsideAdm />

            <section className="container-adm">
                <HeaderAdm h1Text={"Dashboard"} />

                
            </section>
        </main>
    )
}