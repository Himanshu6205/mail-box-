import React, { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { auth, db } from "../firebase/firebase"; // adjust path if needed
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const ComposeMail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Please login first.");
      return;
    }

    const isMounted = useRef(true);

    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    const fromEmail = auth.currentUser.email;

    if (!to || !subject || !editorState.getCurrentContent().hasText()) {
      alert("All fields are required.");
      return;
    }

    const htmlMessage = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    try {
      await addDoc(collection(db, "mails"), {
        toEmail: to,
        fromEmail: fromEmail,
        subject: subject,
        message: htmlMessage,
        timestamp: serverTimestamp(),
      });

      alert("Mail sent successfully!");
      setTo("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.error("Error sending mail:", error);
      alert("Failed to send mail.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 flex items-start justify-center">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
          ✉️ Compose Mail
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              To:
            </label>
            <input
              type="email"
              placeholder="recipient@example.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Subject:
            </label>
            <input
              type="text"
              placeholder="Your subject here"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message:
            </label>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="rounded-md border border-gray-600 bg-gray-700"
              editorClassName="p-4 text-white min-h-[200px]"
              toolbarClassName="!bg-gray-600 !border-b !border-gray-500 rounded-t-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            📤 Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComposeMail;
