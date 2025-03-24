import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "./authContext";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState(""); // Selected user for private chat
  const [messageView, setMessageView] = useState("received"); // Toggle between "sent" and "received"
  const [allUsers, setAllUsers] = useState([]); // List of users to chat with
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch users from Firestore (assuming a 'users' collection exists)
    const usersQuery = query(collection(db, "users"));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      setAllUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribeUsers();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !recipientId) return;

    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", currentUser.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(filteredMessages);
    });

    return () => unsubscribe();
  }, [recipientId, currentUser?.uid]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !recipientId.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        senderId: currentUser.uid,
        recipientId,
        participants: [currentUser.uid, recipientId],
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-72 flex flex-col">
      <h2 className="text-lg font-bold mb-2 text-white">Private Chat</h2>

      {!currentUser ? (
        <p className="text-center text-gray-400">Loading chat...</p>
      ) : (
        <>
          {/* Select Recipient */}
          <select
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="w-full p-2 text-sm mb-2 rounded-lg bg-gray-700 text-white"
          >
            <option value="">Select a User</option>
            {allUsers
              .filter((user) => user.id !== currentUser.uid) // Don't show current user
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.displayName || "Anonymous"} ({user.id})
                </option>
              ))}
          </select>

          {/* Toggle Sent/Received Messages */}
          <div className="flex justify-center mb-2">
            <button
              className={`px-4 py-1 rounded-l-lg ${
                messageView === "received" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"
              }`}
              onClick={() => setMessageView("received")}
            >
              Received
            </button>
            <button
              className={`px-4 py-1 rounded-r-lg ${
                messageView === "sent" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-300"
              }`}
              onClick={() => setMessageView("sent")}
            >
              Sent
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-hidden flex flex-col space-y-2">
            {messages
              .filter((msg) =>
                messageView === "sent"
                  ? msg.senderId === currentUser.uid && msg.recipientId === recipientId
                  : msg.senderId === recipientId && msg.recipientId === currentUser.uid
              )
              .map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 text-sm max-w-[80%] rounded-lg ${
                    msg.senderId === currentUser.uid
                      ? "ml-auto bg-blue-500 text-white text-right"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Field */}
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 text-sm border-none rounded-lg bg-gray-700 text-white focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
