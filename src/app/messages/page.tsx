'use client'

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { signOut } from '@/app/actions';
import { sendMessage } from './actions';
import { LayoutDashboard, Briefcase, BarChart2, UserCircle, LogOut, Gamepad2, Send } from 'lucide-react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

// --- FIX: Define types that match our new RPC function's return value ---
interface Conversation {
    conversation_id: number;
    last_message_at: string;
    other_participant_id: string;
    other_participant_full_name: string;
    other_participant_avatar_url: string | null;
}
interface Message {
    id: number;
    sender_id: string;
    content: string;
}

export default function MessagesPage() {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                // --- FIX: Call the new, robust RPC function ---
                const { data: conversationsData } = await supabase.rpc('get_user_conversations');
                if (conversationsData) setConversations(conversationsData);
            }
        };
        fetchInitialData();
    }, [supabase]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (activeConversationId) {
                const { data } = await supabase
                    .from('messages')
                    .select('id, sender_id, content')
                    .eq('conversation_id', activeConversationId)
                    .order('created_at', { ascending: true });
                if (data) setMessages(data as Message[]);
            } else {
                setMessages([]); // Clear messages when no conversation is active
            }
        };
        fetchMessages();
    }, [activeConversationId, supabase]);

    useEffect(() => {
        if (!activeConversationId) return;
        const channel = supabase.channel(`messages:${activeConversationId}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${activeConversationId}` },
                (payload) => { setMessages(currentMessages => [...currentMessages, payload.new as Message]); }
            )
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [activeConversationId, supabase]);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversationId) return;
        const messageContent = newMessage;
        setNewMessage('');
        await sendMessage(activeConversationId, messageContent);
    };

    return (
        <div className="bg-black text-white min-h-screen flex">
            <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10"><Gamepad2 className="h-7 w-7 text-pink-400" /><h1 className="text-xl font-bold">Immersive Ads</h1></div>
                <nav className="flex flex-col gap-2">
                    <Link href="/dashboard" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LayoutDashboard size={18} /> Overview</Link>
                    <Link href="/dashboard/projects" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><Briefcase size={18} /> Projects</Link>
                    <Link href="/dashboard/analytics" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><BarChart2 size={18} /> Analytics</Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><UserCircle size={18} /> Profile</Link>
                </nav>
                <div className="mt-auto"><form action={signOut}><button className="w-full flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LogOut size={18} /><span>Sign Out</span></button></form></div>
            </aside>

            <main className="flex-1 flex" style={{ height: '100vh' }}>
                <div className="w-1/3 border-r border-neutral-800 flex flex-col">
                    <div className="p-4 border-b border-neutral-800"><h2 className="text-xl font-bold">Conversations</h2></div>
                    <div className="flex-grow overflow-y-auto">
                        {conversations.map(convo => (
                            <div key={convo.conversation_id} onClick={() => setActiveConversationId(convo.conversation_id)} className={`p-4 flex items-center gap-3 cursor-pointer border-l-4 ${activeConversationId === convo.conversation_id ? 'bg-neutral-800 border-pink-500' : 'border-transparent hover:bg-neutral-800/50'}`}>
                                <div className="w-10 h-10 rounded-full bg-neutral-700"></div>
                                <div>
                                    <p className="font-semibold">{convo.other_participant_full_name}</p>
                                    <p className="text-sm text-neutral-400">View conversation</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-2/3 flex flex-col">
                    {activeConversationId ? (
                        <>
                            <div className="flex-grow p-6 overflow-y-auto">
                                <div className="space-y-4">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-md p-3 rounded-xl ${msg.sender_id === user?.id ? 'bg-pink-500 text-white' : 'bg-neutral-700 text-white'}`}>
                                                <p>{msg.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            <div className="p-4 border-t border-neutral-800">
                                <form onSubmit={handleSendMessage} className="flex gap-4">
                                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-grow bg-neutral-800 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                                    <button type="submit" className="bg-pink-500 hover:bg-pink-600 rounded-full p-3"><Send size={18} className="text-white" /></button>
                                </form>
                            </div>
                        </>
                    ) : ( 
                        <div className="flex-grow flex items-center justify-center text-neutral-500">
                            <p>Select a conversation to start chatting.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}