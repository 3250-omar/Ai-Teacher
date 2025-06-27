'use server';
import { CreateCompanion } from "@/types";
import { createSupabaseClient } from "../supabase";
import { auth } from "@clerk/nextjs/server";

export const createCompanion = async (formData:CreateCompanion) => {
    const supabase = createSupabaseClient();
    const {userId:author} =await auth()
    
    const {data , error} = await supabase.from('companions').insert({
        ...formData , author
    }).select()

    if(error || !data) throw new Error(error?.message || "Failed to create companion")

    return data[0]
}