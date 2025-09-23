'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function getOrCreateConversation(otherUserId: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { return { error: 'Not authenticated' }; }

    // Check if a conversation already exists between these two users
    const { data: existingConversation, error: existingError } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant_one_id.eq.${user.id},participant_two_id.eq.${otherUserId}),and(participant_one_id.eq.${otherUserId},participant_two_id.eq.${user.id})`)
        .single();
    
    if (existingConversation) {
        return { conversationId: existingConversation.id };
    }

    if (existingError && existingError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error(existingError);
        return { error: 'Could not check for conversation' };
    }
    
    // If no conversation exists, create a new one
    const { data: newConversation, error: newError } = await supabase
        .from('conversations')
        .insert({
            participant_one_id: user.id,
            participant_two_id: otherUserId
        })
        .select('id')
        .single();

    if (newError) {
        console.error(newError);
        return { error: 'Could not create conversation' };
    }

    return { conversationId: newConversation.id };
}


export async function sendMessage(conversationId: number, content: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { return { error: 'Not authenticated' }; }

    const { error } = await supabase
        .from('messages')
        .insert({
            conversation_id: conversationId,
            sender_id: user.id,
            content: content
        });

    if (error) {
        console.error(error);
        return { error: 'Could not send message' };
    }

    return { success: true };
}