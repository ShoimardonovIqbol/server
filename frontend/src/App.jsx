import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [token, setToken] = useState('');
  const [receiverId, setReceiverId] = useState('2');
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const chatEndRef = useRef(null);

  // Скролл автоматӣ ба паёми охирин
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const connectToChat = () => {
    if (!token) return alert("Лутфан аввал Токени JWT-ро ворид кунед!");

    socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${receiverId}/?token=${token}`);

    socketRef.current.onopen = () => {
      setConnected(true);
      console.log("Пайвастшавӣ ба Cyber-Net муваффақ шуд!");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.onclose = (e) => {
      setConnected(false);
      console.log(`Алоқа канда шуд. Код: ${e.code}`);
    };
  };

  const sendMessage = () => {
    if (inputValue.trim() && socketRef.current) {
      socketRef.current.send(JSON.stringify({ message: inputValue }));
      setInputValue('');
    }
  };

  // СТИЛҲОИ PREMIUM CYBER DARK BLUE
  const styles = {
    wrapper: {
      background: 'radial-gradient(circle at center, #0a1128 0%, #020617 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: '#e2e8f0',
      padding: '20px'
    },
    cyberCard: {
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      border: '1px solid #00f0ff',
      boxShadow: '0 0 25px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(0, 240, 255, 0.05)',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '480px',
      padding: '30px',
      boxSizing: 'border-box'
    },
    glitchHeader: {
      fontSize: '24px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textAlign: 'center',
      marginBottom: '25px',
      color: '#00f0ff',
      textShadow: '0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.2)'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '10px'
    },
    cyberInput: {
      background: 'rgba(30, 41, 59, 0.5)',
      border: '1px solid #1e293b',
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#fff',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    cyberButton: {
      background: 'linear-gradient(90deg, #00f0ff 0%, #0072ff 100%)',
      color: '#020617',
      border: 'none',
      borderRadius: '8px',
      padding: '14px',
      fontSize: '14px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0, 240, 255, 0.3)',
      transition: 'all 0.3s ease'
    },
    chatScreen: {
      display: 'flex',
      flexDirection: 'column',
      height: '450px'
    },
    chatBox: {
      flex: 1,
      overflowY: 'auto',
      padding: '15px',
      background: 'rgba(2, 6, 23, 0.6)',
      border: '1px solid #1e293b',
      borderRadius: '12px',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    msgWrapper: (isMe) => ({
      display: 'flex',
      justifyContent: isMe ? 'flex-end' : 'flex-start'
    }),
    msgBubble: (isMe) => ({
      maxWidth: '75%',
      padding: '10px 16px',
      borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
      background: isMe ? 'linear-gradient(135deg, #0072ff 0%, #0052d4 100%)' : 'rgba(30, 41, 59, 0.8)',
      border: isMe ? 'none' : '1px solid rgba(0, 240, 255, 0.2)',
      color: '#fff',
      fontSize: '14px',
      boxShadow: isMe ? '0 4px 10px rgba(0, 114, 255, 0.2)' : 'none',
      position: 'relative'
    }),
    senderId: {
      fontSize: '10px',
      color: '#64748b',
      marginBottom: '4px',
      display: 'block'
    },
    footerInputRow: {
      display: 'flex',
      gap: '10px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.cyberCard}>
        <h2 style={styles.glitchHeader}>// CYBER.CHAT_</h2>

        {!connected ? (
          <div style={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="НЕЙРО-ТОКЕН (JWT ACCESS TOKEN)" 
              value={token} 
              onChange={(e) => setToken(e.target.value)} 
              style={styles.cyberInput}
              onFocus={(e) => e.target.style.borderColor = '#00f0ff'}
              onBlur={(e) => e.target.style.borderColor = '#1e293b'}
            />
            <input 
              type="number" 
              placeholder="ID КОРБАРИ ҚАБУЛКУНАНДА" 
              value={receiverId} 
              onChange={(e) => setReceiverId(e.target.value)} 
              style={styles.cyberInput}
              onFocus={(e) => e.target.style.borderColor = '#00f0ff'}
              onBlur={(e) => e.target.style.borderColor = '#1e293b'}
            />
            <button 
              onClick={connectToChat} 
              style={styles.cyberButton}
              onMouseOver={(e) => e.target.style.filter = 'brightness(1.2)'}
              onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
            >
              ИНИТСИАЛИЗАТСИЯИ ПАЙВАСТ
            </button>
          </div>
        ) : (
          <div style={styles.chatScreen}>
            <div style={styles.chatBox} className="cyber-scrollbar">
              {messages.map((msg, index) => {
                // Санҷиши он ки паём аз кӣ омадааст (барои санҷиш мо ID-ро муқоиса мекунем)
                const isMe = msg.receiver_id === parseInt(receiverId); 
                return (
                  <div key={index} style={styles.msgWrapper(isMe)}>
                    <div style={styles.msgBubble(isMe)}>
                      <span style={styles.senderId}>USER_ID: {msg.sender_id}</span>
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
            
            <div style={styles.footerInputRow}>
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                placeholder="Вуруди паёми рамзӣ..." 
                style={{...styles.cyberInput, flex: 1}}
                onFocus={(e) => e.target.style.borderColor = '#00f0ff'}
                onBlur={(e) => e.target.style.borderColor = '#1e293b'}
              />
              <button 
                onClick={sendMessage} 
                style={{...styles.cyberButton, padding: '0 20px'}}
                onMouseOver={(e) => e.target.style.filter = 'brightness(1.2)'}
                onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
              >

              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
