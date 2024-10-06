// index.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Assets
import AlarmIcon from "/img/alarm.webp";
import LiftingIcon from "/img/lifting.webp";
import CoffeeIcon from "/img/coffee.webp";
import Books from "/img/books.webp";
import InProgressIcon from "/img/Time_atack_duotone.webp";
import CompletedIcon from "/img/Done_round_duotone.webp";
import WontDoIcon from "/img/close_ring_duotone.webp";
import EditIcon from "/img/pencil.webp"
import TrashIcon from "/img/trash.webp"

// Type pour Task
interface Task {
    id: number;
    name: string;
    category: string;
}

// Composant TaskBoard
const TaskBoard: React.FC = () => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ name: "", category: "toDo" });

    // Fonction pour basculer l'affichage des catégories
    const toggleCategory = (category: string) => {
        setOpenCategory(openCategory === category ? null : category);
    };

    // Fonction pour récupérer les tâches depuis l'API
    const getTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3310/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fonction pour ajouter une nouvelle tâche
    const addTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3310/api/tasks", newTask);
            setTasks((prevTasks) => [...prevTasks, response.data]);
            setNewTask({ name: "", category: "toDo" });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    // Fonction pour afficher les tâches selon leur catégorie
    const getTasksByCategory = (category: string) => (
        tasks.filter((task) => task.category === category)
    );

    return (
        <div className="w-full max-w-[556px] space-y-4">
            <CategorySection
                category="inProgress"
                openCategory={openCategory}
                toggleCategory={toggleCategory}
                icon={AlarmIcon}
                title="Task in Progress"
                iconEnd={InProgressIcon}
                bgColor="bg-amber-400"
            >
                {getTasksByCategory("inProgress").length ? (
                    getTasksByCategory("inProgress").map((task) => (
                        <div key={task.id} className="flex justify-between items-center mb-2 p-2 h-16 rounded-md shadow bg-white">
                            {task.name}
                            <div className="flex justify-center items-center">
                                <button className="mx-1 p-1 text-white rounded-full bg-orange-400">
                                    <img className="p-[.1rem] w-4 h-4" src={EditIcon} alt="Edit" loading="lazy" />
                                </button>
                                <button className="mx-1 p-1 text-white rounded-full bg-red-700">
                                    <img className="p-[.1rem] w-4 h-4" src={TrashIcon} alt="Delete" loading="lazy" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-gray-500">Aucune tâche à afficher...</div>
                )}
            </CategorySection>

            <CategorySection
                category="completed"
                openCategory={openCategory}
                toggleCategory={toggleCategory}
                icon={LiftingIcon}
                title="Task Completed"
                iconEnd={CompletedIcon}
                bgColor="bg-green-400"
            >
                {getTasksByCategory("completed").length ? (
                    getTasksByCategory("completed").map((task) => (
                        <div key={task.id} className="p-2 bg-white mb-2 rounded-md shadow">
                            {task.name}
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-gray-500">Aucune tâche à afficher...</div>
                )}
            </CategorySection>

            <CategorySection
                category="wontDo"
                openCategory={openCategory}
                toggleCategory={toggleCategory}
                icon={CoffeeIcon}
                title="Task Won't Do"
                iconEnd={WontDoIcon}
                bgColor="bg-red-400"
            >
                {getTasksByCategory("wontDo").length ? (
                    getTasksByCategory("wontDo").map((task) => (
                        <div key={task.id} className="flex justify-between items-center mb-2 p-2 rounded-md shadow bg-white">
                            <div className="flex justify-between items-center">
                                {task.name}
                                <div>
                                    <button className="bg-red-500 text-white rounded p-1">Delete</button>
                                    <button className="bg-blue-500 text-white rounded p-1">Modify</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-gray-500">Aucune tâche à afficher...</div>
                )}
            </CategorySection>

            <CategorySection
                category="toDo"
                openCategory={openCategory}
                toggleCategory={toggleCategory}
                icon={Books}
                title="Task To Do"
                bgColor="bg-slate-300"
            >
                {getTasksByCategory("toDo").length ? (
                    getTasksByCategory("toDo").map((task) => (
                        <div key={task.id} className="p-2 bg-white mb-2 rounded-md shadow">
                            {task.name}
                        </div>
                    ))
                ) : (
                    <div className="p-2 text-gray-500">Aucune tâche à afficher...</div>
                )}
            </CategorySection>

            <CategorySection
                category="newTask"
                openCategory={openCategory}
                toggleCategory={toggleCategory}
                icon={AlarmIcon}
                title="Create New Task"
                bgColor="bg-blue-400"
            >
                <div className="mb-5 p-5">
                    <form onSubmit={addTask}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Task Name</label>
                            <input
                                type="text"
                                value={newTask.name}
                                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                                className="w-full p-2 border rounded"
                                placeholder="Enter task name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Category</label>
                            <select
                                value={newTask.category}
                                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="toDo">To Do</option>
                                <option value="inProgress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="wontDo">Won't Do</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Task
                        </button>
                    </form>
                </div>
            </CategorySection>
        </div>
    );
};

// Composant pour afficher les sections de catégorie
interface CategorySectionProps {
    category: string;
    openCategory: string | null;
    toggleCategory: (category: string) => void;
    icon: string;
    title: string;
    iconEnd?: string;
    bgColor?: string;
    children: React.ReactNode;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    openCategory,
    toggleCategory,
    icon,
    title,
    iconEnd,
    bgColor = "bg-gray-300",
    children
}) => (
    <>
        <div
            className={`task-category cursor-pointer flex justify-between items-center px-5 w-full h-20 rounded-xl ${bgColor}`}
            onClick={() => toggleCategory(category)}
        >
            <div className="flex justify-center items-center">
                <span className="flex justify-center items-center mr-3 p-[.4rem] w-9 h-9 rounded-md bg-[#F8FAFC]">
                    <img src={icon} alt="" loading="lazy" />
                </span>
                <span>{title}</span>
            </div>
            {iconEnd && (
                <span>
                    <img src={iconEnd} alt="" loading="lazy" />
                </span>
            )}
        </div>
        <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openCategory === category ? "max-h-[300px]" : "max-h-0"}`}
        >
            <div className="p-5">
                {children}
            </div>
        </div>
    </>
);

export default TaskBoard;
