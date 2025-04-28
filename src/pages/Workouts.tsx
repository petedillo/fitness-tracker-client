import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import API from '../api/axios';
import { useAuth } from '../auth/AuthContext';
import { Workout, Exercise } from '../types';

const Workouts: React.FC = () => {
    // Add error handling around the useAuth call
    let userId: number | null = null;
    try {
        const auth = useAuth();
        userId = auth.userId;
    } catch (error) {
        console.error("Auth context error:", error);

    }

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [exercises, setExercises] = useState<Record<number, Exercise>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setLoading(false);
                setError('User authentication required');
                return;
            }
            
            try {
                // Fetch workouts for the authenticated user using the userId from context
                const workoutsResponse = await API.get(`/users/${userId}/workouts`);
                setWorkouts(workoutsResponse.data);

                // Fetch exercises to display their names
                const exercisesResponse = await API.get('/exercises');
                const exercisesMap: Record<number, Exercise> = {};
                exercisesResponse.data.forEach((exercise: Exercise) => {
                    exercisesMap[exercise.id] = exercise;
                });
                setExercises(exercisesMap);
            } catch (err) {
                setError('Failed to load workouts');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return (
            <Layout>
                <div className="text-center py-8">Loading workouts...</div>
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
            <h2 className="text-2xl font-bold mb-6">Workouts</h2>

            {workouts.length === 0 ? (
                <p>No workouts found</p>
            ) : (
                <div className="space-y-6">
                    {workouts.map((workout) => (
                        <div key={workout.id} className="bg-gray-800 p-4 rounded shadow">
                            <h3 className="text-xl font-semibold mb-2">{workout.title}</h3>
                            <p className="text-gray-300 mb-4">{workout.description}</p>

                            <h4 className="font-medium mb-2">Exercises:</h4>
                            <ul className="space-y-2">
                                {workout.exercises.map((ex, index) => (
                                    <li key={index} className="bg-gray-700 p-3 rounded">
                                        <p className="font-medium">
                                            {exercises[ex.exerciseId]?.name || `Exercise #${ex.exerciseId}`}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {ex.sets} sets × {ex.reps} reps
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Workouts;