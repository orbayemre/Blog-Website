import { Spinner } from '@chakra-ui/react'

export default function Loading(){
    return(
     <div className="w-screen h-full absolute flex items-center justify-center bg-second z-50">
             <Spinner className="fixed top-1/2 w-40 h-40 text-first"
                      thickness='8px'  speed='0.65s'/>
     </div>
    )
}