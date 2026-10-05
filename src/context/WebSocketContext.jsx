import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const [lastEvent, setLastEvent] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [connected, setConnected] = useState(false);

  // Play a soft luxury alert chime using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      // AudioContext might be blocked until user gesture, ignore safely
    }
  };

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, ...toast }]);
    playChime();
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    let socket;
    let reconnectTimer;

    function connect() {
      try {
        socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          setConnected(true);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            setLastEvent(data);

            if (data.type === 'NEW_REQUEST') {
              addToast({
                type: 'success',
                title: 'New Catering Request Received!',
                message: `${data.payload.request.customerName} selected ${data.payload.request.selectedFoods?.length} items for ${data.payload.request.eventType}`
              });
            } else if (data.type === 'REQUEST_STATUS_UPDATED') {
              addToast({
                type: 'info',
                title: 'Order Status Updated',
                message: `Request ${data.payload.id} changed to ${data.payload.status}`
              });
            }
          } catch (err) {
            console.error('WS Parse error', err);
          }
        };

        socket.onclose = () => {
          setConnected(false);
          reconnectTimer = setTimeout(connect, 3000);
        };

        socket.onerror = () => {
          socket.close();
        };
      } catch (e) {
        reconnectTimer = setTimeout(connect, 3000);
      }
    }

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (socket) socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ lastEvent, connected, toasts, addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border backdrop-blur-md transform transition-all duration-300 animate-fade-in ${
              toast.type === 'success'
                ? 'bg-amber-900/90 border-amber-500/40 text-amber-50'
                : 'bg-stone-900/90 border-stone-700 text-stone-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-sm text-amber-400">{toast.title}</p>
                <p className="text-xs text-stone-200 mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-stone-400 hover:text-white text-xs ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
