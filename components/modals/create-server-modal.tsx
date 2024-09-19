"use client"

import { DialogDescription } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUpload } from '../file-upload';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-model-store';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Image is required."
    })
});

export  const CreateServerModal = () => {
    const router = useRouter(); 
    const   {isOpen, onClose, type} = useModal()

    const   isModalOpen = isOpen && type === 'createServer'

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onsubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/server", values);
            form.reset();
            router.refresh();  
            toast.success("Comunidade Criada com Sucesso!",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });  
            onClose()
        } catch (error) {
            console.log(error);
            toast.error("Falha ao Criar Comunidade, Tente Novamente.");
        }
    }; 

    const handleClose = () =>{
        form.reset()
        onClose()
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Teu Servidor
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Cria o teu proprio Servidor e aproveite as features aqui
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)} className='space-y-8'>
                        <div className='space-y-8 px-6'>
                            <div className='flex items-center justify-center text-center'>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint='serverImage'
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
                                            Nome do Servidor
                                        </FormLabel>
                                       <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                                                placeholder='Coloque o Nome do Seu Servidor'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className='bg-gray-100 px-6 py-4'>
                        <Button variant="primary" disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
