import Footer from "../components/footer";
import Navbar from "../components/navbar";
import MainPage from "../components/p2c/mainPage";


export default function P2C() {


    return (
        <div className="flex w-full  bg-black  justify-center">
            <div className=" h-screen w-full border-[1px] border-[#373737] bg-[#191919] py-4 blur-[50] text-white md:w-[550px] shadow-xl">
               <Navbar/>
               <MainPage/>
               <Footer/>
            </div>
        </div>
    );
}
