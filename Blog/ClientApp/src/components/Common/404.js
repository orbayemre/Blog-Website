import LottieAnimation from "./LottieAnimation";

export default function NotFound(){
    return(
        <div className="w-screen h-screen absolute flex flex-col items-center justify-center">
            <LottieAnimation link={"https://assets5.lottiefiles.com/packages/lf20_teutzxdt.json"} height={"70%"} width={"70%"}/>
            <span className="fontSignika text-black font-bold text-3xl">Oops!</span>
            <span className="fontSignika text-black font-bold text-3xl">Sayfa Bulunamadı.</span>
        </div>
    )
}