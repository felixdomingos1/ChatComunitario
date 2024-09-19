import { db } from "./db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs/server"

export const currentProfile = async () =>{
    const userId = await currentUser()

    if (!userId) {
        return null
    }

    const   profile = await db.profile.findUnique({
        where:{
            userId:userId.id
        }
    })
    return profile
}