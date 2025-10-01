import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import api from "../Lib/axios.js";
import { toast } from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      
      if(error.response.status === 429){
        toast.error("Too many requests, please try again later.", {
            duration: 4000
        });
      } else {
        toast.error("Error creating note");
      }
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                Back To Notes
            </Link>

            <div className="card bg-base-100">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="title" className="text-sm font-medium text-base-content/80 mb-2 block">Title</label>
                                <input 
                                    id="title"
                                    type="text" 
                                    placeholder="Note Title" 
                                    className="input input-bordered w-full" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                     
                                />
                            </div>
                            <div>
                                <label htmlFor="content" className="text-sm font-medium text-base-content/80 mb-2 block">Content</label>
                                <textarea 
                                    id="content"
                                    placeholder="Note Content" 
                                    className="textarea textarea-bordered h-32 w-full" 
                                    value={content} 
                                    onChange={(e) => setContent(e.target.value)} 
                                    
                                ></textarea>
                            </div>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Creating..." : "Create Note"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>;
};

export default CreatePage;
