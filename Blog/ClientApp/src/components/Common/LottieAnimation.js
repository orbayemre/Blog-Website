import {useRef,useEffect} from "react";

export default function LottieAnimation({link,width,height}){

    const AnimaRef = useRef();
    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });
    return(
        <lottie-player
            id="firstLottie"
            ref={AnimaRef}
            autoplay
            loop
            mode="normal"
            src={link}
            style={{ width: width, height: height }}
        ></lottie-player>
    )
}