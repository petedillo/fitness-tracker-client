import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import API from '../api/axios';
import { Exercise } from '../types';
import ExerciseDetailModal from '../components/ExerciseDetailModal';

const Exercises: React.FC = () => {

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await API.get('/exercises');
        setExercises(response.data);
      } catch {
        setError('Failed to load exercises');
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const openExerciseDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">Loading exercises...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-500 text-white p-3 rounded mb-4">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Exercises</h2>

      {exercises.length === 0 ? (
        <p className="text-center">No exercises found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:bg-gray-750 transition duration-200"
              onClick={() => openExerciseDetails(exercise)}
            >
              {exercise.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{exercise.name}</h3>
                <p className="text-gray-300 mb-3">{exercise.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </Layout>
  );
};

export default Exercises;