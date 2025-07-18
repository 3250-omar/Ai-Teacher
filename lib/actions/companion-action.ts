'use server';
import { CreateCompanion, GetAllCompanions } from "@/types";
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

export const getAllCompanions = async ({limit= 10 , page = 1 , topic , subject}:GetAllCompanions)=>{
    const supabase = createSupabaseClient()
    let query = supabase.from('companions').select()
    if(topic && subject){
        query = query.ilike('subject', `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%` )
    }else if(subject){
        query = query.ilike('subject', `%${subject}%`)
        
    }else if(topic){
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%` )
    } 
    
    query = query.range((page-1)*limit , page *(limit-1))
const {data:companions , error} = await query;

if(error) throw new Error(error?.message || "Failed to fetch companions");

return companions;

}

export const getCompanion = async (id:string)=>{
    const supabase = createSupabaseClient()
    const {data , error} = await supabase.from('companions').select().eq('id',id)
    if(error || !data) throw new Error(error?.message || "Failed to fetch companion")
    return data[0]
}


export const addToHistory = async (companionId:string)=>{ 
    const supabase = createSupabaseClient()
    const {userId:userId} = await auth()
    const {data , error} = await supabase.from('session_history').insert({
        companion_id: companionId,
        user_id: userId
    })
    if(error || !data) throw new Error(error?.message || "Failed to add to history")
        return data
  }


  export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const {data , error } = await supabase.from('session_history').select('companions:companion_id (*)').order('created_at' , {ascending:false}).limit(limit)


    if(error) throw new Error (error.message)

        return data.map(({companions}) => companions)
}

  export const getUserCompanions = async (userId:string) => {
    const supabase = createSupabaseClient();
    const {data , error } = await supabase.from('companions').select().order('created_at' , {ascending:false}).eq('author', userId)

    if(error) throw new Error (error.message)

        return data;
}


  export const getUserSessions = async (userId:string, limit = 10) => {
    const supabase = createSupabaseClient();
    const {data , error } = await supabase.from('session_history').select('companions:companion_id (*)').order('created_at' , {ascending:false}).eq('user_id', userId).limit(limit)

    if(error) throw new Error (error.message)

        return data.map(({companions}) => companions)
}


export const CreatingCompanionPermission =async()=>{
    const supabase = createSupabaseClient()
    const {has ,userId} = await auth()
    let limit =0

    if(has({plan:'pro'})){
        return true
    }else if(has({feature:'10_added_companions'})){
        limit= 10
    }else if(has({feature:'3_active_companion'})){
        limit= 3
    }

    const {data , error} = await supabase.from('companions').select('id' , {count:'exact'}).eq('author', userId)
    if(error) throw new Error(error.message || "Failed to fetch companions count")
        const companionsCount = data?.length || 0;
        if(companionsCount >= limit && limit > 0){
            return false
        }
        else{
            return true
        }
}