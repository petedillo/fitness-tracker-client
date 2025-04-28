// src/components/ExerciseDetailModal.tsx
import React from 'react';
import { Exercise } from '../types';
import Button from './Button';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {exercise.imageUrl && (
            <div className="mb-6">
              <img 
                src={exercise.imageUrl} 
                alt={exercise.name} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">
              {exercise.muscleGroup}
            </span>
            <span className="bg-purple-600 text-xs px-2 py-1 rounded-full">
              {exercise.difficulty}
            </span>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-300">{exercise.description}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Equipment</h3>
            <p className="text-gray-300">{exercise.equipment}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Instructions</h3>
            <ol className="list-decimal pl-5 text-gray-300 space-y-2">
              {exercise.instructions.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </div>
          
          {exercise.videoUrl && (
            <div className="mb-6">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open(exercise.videoUrl, '_blank')}
              >
                Watch Video Tutorial
              </Button>
            </div>
          )}
          
          <div className="text-sm text-gray-400">
            <p>Last updated: {new Date(exercise.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;