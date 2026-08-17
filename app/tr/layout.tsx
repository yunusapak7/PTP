import { Footer, Header } from "../components";
export default function TurkishLayout({children}:{children:React.ReactNode}){return <div lang="tr"><Header/><main>{children}</main><Footer/></div>}
