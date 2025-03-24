import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudyGroupPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prerequisites: "",
    skills: "",
    level: "",
    duration: "",
    mode: "",
    contactEmail: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [studyGroups, setStudyGroups] = useState([
    {
      id: 1,
      title: "JavaScript Study Group",
      description: "Study JavaScript fundamentals and advanced topics together.",
      prerequisites: "Basic understanding of programming",
      skills: "JavaScript, Web Development",
      level: "Beginner",
      duration: "4 weeks",
      mode: "Online",
      contactEmail: "owner1@example.com",
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      description: "Collaborate on projects and learn data science concepts.",
      prerequisites: "Python, Statistics knowledge",
      skills: "Python, Machine Learning, Data Analysis",
      level: "Moderate",
      duration: "2 months",
      mode: "Offline",
      contactEmail: "owner2@example.com",
    },
  ]);

  // Handle input changes for form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.contactEmail) {
      toast.error("Please fill in the required fields!", { position: "top-right" });
      return;
    }

    // Create new study group object
    const newStudyGroup = {
      id: studyGroups.length + 1,
      ...formData,
    };

    // Update study groups state
    setStudyGroups([...studyGroups, newStudyGroup]);

    // Show success message
    toast.success("Study Group posted successfully! 🎉", { position: "top-right" });

    // Reset form
    setFormData({
      title: "",
      description: "",
      prerequisites: "",
      skills: "",
      level: "",
      duration: "",
      mode: "",
      contactEmail: "",
    });

    setIsFormVisible(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex flex-col items-center p-8">
      {/* Header Section */}
      <div className="w-full max-w-4xl flex justify-between items-center bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-700">📚 Study Groups</h2>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          {isFormVisible ? "Close Form" : "➕ Post a Study Group"}
        </button>
      </div>

      {/* Display Study Groups */}
      <div className="w-full max-w-4xl mt-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Available Study Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studyGroups.map((studyGroup) => (
            <div
              key={studyGroup.id}
              className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 transform hover:scale-105 transition"
            >
              <h4 className="text-xl font-semibold text-gray-800">{studyGroup.title}</h4>
              <p className="text-gray-600 mt-2">{studyGroup.description}</p>
              <p className="text-gray-700 mt-2"><strong>Skills:</strong> {studyGroup.skills}</p>
              <p className="text-gray-700"><strong>Level:</strong> {studyGroup.level}</p>
              <p className="text-gray-700"><strong>Duration:</strong> {studyGroup.duration}</p>
              <p className="text-gray-700"><strong>Mode:</strong> {studyGroup.mode}</p>
              <button
                onClick={() => toast.info(`Form sent to ${studyGroup.contactEmail}`, { position: "top-right" })}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                🤝 Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Study Group Form */}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white p-6 mt-8 rounded-xl shadow-lg transform transition-all animate-fadeIn"
        >
          <h3 className="text-2xl font-semibold text-indigo-700 mb-4">📌 Create a Study Group</h3>

          {["title", "description", "prerequisites", "skills", "contactEmail"].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-semibold capitalize">{field}</label>
              <input
                type={field === "contactEmail" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
                placeholder={`Enter ${field}...`}
              />
            </div>
          ))}

          {/* Dropdowns */}
          {[ 
            { name: "level", options: ["Beginner", "Moderate", "Hard"] },
            { name: "duration", options: ["4 weeks", "2 months"] },
            { name: "mode", options: ["Online", "Offline"] },
          ].map((selectField, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-semibold capitalize">{selectField.name}</label>
              <select
                name={selectField.name}
                value={formData[selectField.name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-700"
              >
                <option value="">Select {selectField.name}</option>
                {selectField.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="w-full px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            🚀 Submit Study Group
          </button>
        </form>
      )}
    </div>
  );
};

export default StudyGroupPage;
