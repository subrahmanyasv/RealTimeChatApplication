import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import useChatStore from "../Store/Store.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useChatStore();
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container px-5 mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chat Application</h1>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-lg">{username ? username : "Guest"}</span>
          <User size={28} className="bg-white text-gray-800 rounded-full p-1" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-gray-800 p-3 rounded">
          <div className="flex items-center justify-between">
            <span className="text-lg">{username ? username : "Guest"}</span>
            <User size={28} className="bg-white text-gray-800 rounded-full p-1" />
          </div>
        </div>
      )}
    </nav>
  );
}
