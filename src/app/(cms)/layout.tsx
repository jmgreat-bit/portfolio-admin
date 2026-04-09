export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                {children}

                {/* Global Floating Switcher */}
                <div style={{
                    position: "fixed",
                    bottom: "24px",
                    left: "24px",
                    zIndex: 99999,
                    display: "flex",
                    gap: "8px",
                    background: "#0f1117",
                    padding: "6px",
                    borderRadius: "12px",
                    border: "1px solid #1e293b",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}>
                    <a 
                        href="/keystatic"
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: 600,
                            fontFamily: "system-ui, sans-serif",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}
                    >
                        📝 Content
                    </a>
                    <a 
                        href="/messages"
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: 600,
                            fontFamily: "system-ui, sans-serif",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "#06b6d4",
                            boxShadow: "0 2px 10px rgba(6, 182, 212, 0.3)"
                        }}
                    >
                        📬 Messages
                    </a>
                </div>
            </body>
        </html>
    );
}
