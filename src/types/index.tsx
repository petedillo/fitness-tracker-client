// src/types/index.ts
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Exercise {
  id: number;
  name: string;
  muscleGroup: string;
  description: string;
  difficulty: string;
  equipment: string;
  videoUrl: string;
  imageUrl: string;
  instructions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExercisesResponse {
  success: boolean;
  exercises: Exercise[];
  pagination: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  filters: {
    muscleGroups: string[];
    difficulties: string[];
    equipment: string[];
  };
}

export interface Workout {
  id: number;
  title: string;
  description: string;
  exercises: {
    exerciseId: number;
    sets: number;
    reps: number;
  }[];
}