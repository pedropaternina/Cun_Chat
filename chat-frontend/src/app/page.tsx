
import Link from "next/link";
import 'tailwindcss'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
     <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <main className="flex-grow">
      </main>
      <Footer></Footer>
    </div>
  
      
    </>


  );
}
