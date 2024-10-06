import { useState, useEffect } from "react";
import axios from "axios";
import TaskBoard from "./components/TaskBoard";

function App() {
  // Initialise le title avec une valeur par défaut
  const [title, setTitle] = useState("My Task Board");
  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour gérer la mise à jour du titre
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Fonction pour envoyer le titre via une requête POST
  const sendTitleToAPI = async (newTitle) => {
    try {
      await axios.post("http://localhost:3310/api/title", { title: newTitle });
    } catch (error) {
      console.error("Error sending title to server:", error);
    }
  };

  // Fonction pour récupérer le titre via une requête GET
  const fetchTitleFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3310/api/title");
      const fetchedTitle = response.data[0].name;
      setTitle(fetchedTitle); // Mets à jour l'état avec le titre récupéré
    } catch (error) {
      console.error("Error fetching title from server:", error);
    }
  };

  // Utilise useEffect pour exécuter fetchTitleFromAPI une seule fois après le premier rendu
  useEffect(() => {
    fetchTitleFromAPI();
  }, []);

  // Fonction pour basculer entre le mode d'édition et le mode lecture
  const toggleEdit = () => {
    if (isEditing) {
      sendTitleToAPI(title); // Envoie le titre si on sort du mode édition
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-h-screen bg-[#F8FAFC]">
      <div className="flex flex-col items-center">
        <div className="flex items-center mt-12 mb-3">
          <img src="/svg/Logo.svg" alt="" />

          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={toggleEdit}
              className="mx-3 text-4xl font-medium border-b-2 border-gray-400 focus:outline-none"
              autoFocus
            />
          ) : (
            <h1 className="mx-3 text-4xl font-medium">{title}</h1>
          )}

          <button onClick={toggleEdit}>
            <img src="/svg/Edit_duotone.svg" alt="Edit" />
          </button>
        </div>
        <p className="mb-10 text-sm text-gray-500">Tasks to keep organised</p>
      </div>
      <TaskBoard />
    </div>
  );
}

export default App;
