'use client'

import { Plus } from "lucide-react"
import { ActionToolTip } from "../ation-tooltip"
import { useModal } from "@/hooks/use-model-store"

export  const   NavigationAction = () =>{
    const {onOpen} = useModal()

    return(
        <div className="">
            <ActionToolTip
            side="right"
            align="center"
            label="Adicionar um Servidor"
            >
                <button className="group flex items-center" onClick={()=> onOpen('createServer')}>
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all 
                    overflow-hidden items-center justify-center bg-background dark:gb-neutral-700 group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emerald-500" size={25}/>
                    </div>                
                </button>
            </ActionToolTip>
        </div>
    )
}