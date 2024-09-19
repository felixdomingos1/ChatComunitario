import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handlerAuth = () =>{
    const {userId} = auth()

    if(!userId) throw new Error("Não Autorizado")
    

    return {userId: userId }
}

export const ourFileRouter = {
    serverImage: f({image : {maxFileSize:"4MB", maxFileCount:1}})
    .middleware(()=> handlerAuth())
    .onUploadComplete(()=>{}),
    messageFile: f(["image","pdf", "video"])
    .middleware(()=> handlerAuth())
    .onUploadComplete(()=>{})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
