"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Message {
    id: string;
    created_at: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selected, setSelected] = useState<Message | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) setMessages(data);
        setLoading(false);
    };

    const markAsRead = async (msg: Message) => {
        setSelected(msg);
        if (!msg.read) {
            await supabase
                .from("contact_messages")
                .update({ read: true })
                .eq("id", msg.id);
            setMessages((prev) =>
                prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
            );
        }
    };

    const deleteMessage = async (id: string) => {
        await supabase.from("contact_messages").delete().eq("id", id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selected?.id === id) setSelected(null);
    };

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        });
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#0f1117", color: "#e2e8f0" }}>
            {/* Header */}
            <div style={{ borderBottom: "1px solid #1e293b", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0a0d14" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <a href="/keystatic" style={{ color: "#64748b", textDecoration: "none", fontSize: 14 }}>← Back to CMS</a>
                    <span style={{ color: "#1e293b" }}>|</span>
                    <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#f1f5f9" }}>
                        📬 Messages
                    </h1>
                    {unreadCount > 0 && (
                        <span style={{ background: "#06b6d4", color: "#fff", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>
                            {unreadCount} new
                        </span>
                    )}
                </div>
                <button
                    onClick={fetchMessages}
                    style={{ background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}
                >
                    ↻ Refresh
                </button>
            </div>

            <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>
                {/* Sidebar — message list */}
                <div style={{ width: 320, borderRight: "1px solid #1e293b", overflowY: "auto", background: "#0a0d14" }}>
                    {loading ? (
                        <div style={{ padding: 32, color: "#64748b", textAlign: "center" }}>Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div style={{ padding: 32, color: "#64748b", textAlign: "center" }}>
                            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
                            <p>No messages yet.</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => markAsRead(msg)}
                                style={{
                                    padding: "16px 20px",
                                    borderBottom: "1px solid #1e293b",
                                    cursor: "pointer",
                                    background: selected?.id === msg.id ? "#1e293b" : "transparent",
                                    borderLeft: !msg.read ? "3px solid #06b6d4" : "3px solid transparent",
                                    transition: "background 0.15s",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                                    <span style={{ fontWeight: msg.read ? 500 : 700, fontSize: 14, color: msg.read ? "#94a3b8" : "#f1f5f9" }}>
                                        {msg.name}
                                    </span>
                                    <span style={{ fontSize: 11, color: "#475569" }}>{formatDate(msg.created_at)}</span>
                                </div>
                                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{msg.email}</div>
                                <div style={{ fontSize: 13, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Main — message detail */}
                <div style={{ flex: 1, overflowY: "auto", padding: 40 }}>
                    {selected ? (
                        <div style={{ maxWidth: 680 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                                <div>
                                    <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>{selected.name}</h2>
                                    <a href={`mailto:${selected.email}`} style={{ color: "#06b6d4", fontSize: 14, textDecoration: "none" }}>
                                        {selected.email}
                                    </a>
                                    <p style={{ margin: "8px 0 0", fontSize: 12, color: "#475569" }}>{formatDate(selected.created_at)}</p>
                                </div>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <a
                                        href={`mailto:${selected.email}?subject=Re: Your message to The Great Web`}
                                        style={{ background: "#06b6d4", color: "#fff", padding: "8px 18px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600 }}
                                    >
                                        Reply via Email
                                    </a>
                                    <button
                                        onClick={() => deleteMessage(selected.id)}
                                        style={{ background: "#1e293b", border: "1px solid #ef4444", color: "#ef4444", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13 }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 16, padding: 28, lineHeight: 1.7, fontSize: 15, color: "#cbd5e1", whiteSpace: "pre-wrap" }}>
                                {selected.message}
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#334155" }}>
                            <div style={{ fontSize: 60, marginBottom: 16 }}>✉️</div>
                            <p style={{ fontSize: 16 }}>Select a message to read it</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
