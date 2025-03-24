import React from "react";

const Activity = () => {
  return (
    <div className="bg-gray-900 bg-opacity-90 p-6 rounded-2xl shadow-lg backdrop-blur-md flex-1 w-full max-w-md">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Recent Activity</h3>

      <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700 transition duration-300">
        <span className="text-2xl">👥</span>
        <div className="flex-1">
          <p className="font-semibold text-gray-200">New collaboration request</p>
          <p className="text-sm text-gray-400">From Alex for Data Structures project</p>
        </div>
        <span className="bg-gradient-to-r from-green-500 to-green-400 text-white text-xs px-3 py-1 rounded-full font-medium">
          New
        </span>
      </div>
    </div>
  );
};

export default Activity;
