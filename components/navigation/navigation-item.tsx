'use client'

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ActionToolTip } from "@/components/ation-tooltip"


interface NavigationItemProps{
    id:string,
    name:string,
    imageUrl:string,
} 

export  const NavigationItem = ( {
    id,
    name,
    imageUrl
}:NavigationItemProps) =>{

    const   params = useParams()
    const   router = useRouter()

    const   handleClick = () =>{
        router.push(`/servers/${id}`)
    }
    return(
        <ActionToolTip
        side='right'
        align="center"
        label={name}
        >
            <button onClick={()=>handleClick()} className="group relative items-center">
                <div className={cn(
                    'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
                    params?.serverId !== id && "group-houver:h-[48px]",
                    params?.serverId === id ? "h-[42px]" : 'h-[8px]'
                )}>
                </div>
                <div className={cn(
                    "relative group flex mx-3 h-[42px] w-[42px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && 'bg-primary/10 text-primary rounded-[16px]')}>
                        <Image 
                            fill
                            src={imageUrl}
                            alt="Canal"
                        />
                </div>
            </button>
        </ActionToolTip>
    )
}