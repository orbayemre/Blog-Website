import { Spinner } from '@chakra-ui/react'

export default function Loading(){
    return(
     <div className="w-screen h-screen absolute flex items-center justify-center backdrop-blur z-50">
             <Spinner className="w-40 h-40 text-first"
                      thickness='8px'  speed='0.65s'/>
     </div>
    )
}