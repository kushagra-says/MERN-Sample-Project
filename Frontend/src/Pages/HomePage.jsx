import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import RateLimitedUI from "../Components/RateLimitedUI";
import api from "../Lib/axios";
import { toast } from "react-hot-toast";
import NoteCard from "../Components/NoteCard";
import NotesNotFound from "../Components/NotesNotFound";

const App = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get("/notes");
                console.log(response.data);
                setNotes(response.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Error fetching notes:", error);
                console.log(error)
                if(error.response?.status === 429){
                    setIsRateLimited(true);
                    toast.error("Too many requests, please try again later.");
                } else {
                    toast.error("Error fetching notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

  return <div className="min-h-screen">
    <Navbar />

    {isRateLimited && <RateLimitedUI />}

    {notes.length === 0 && !isRateLimited && <NotesNotFound />}

    <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
            </div>
        )}

    </div>

  </div>;
};

export default App;