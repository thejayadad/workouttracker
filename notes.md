
//server actions

```
'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

// CREATE Exercise
export async function createExercise(data: {
  name: string;
  type: 'STRENGTH' | 'CARDIO';
  sets?: number | null;
  reps?: number | null;
  weight?: number | null;
  duration?: number | null;
  calories?: number | null;
  distance?: number | null;
  planId: string;
}) {
  await prisma.exercise.create({
    data: {
      ...data,
    },
  });

  revalidatePath(`/workout/${data.planId}`);
}

// GET Exercises for a Plan
export async function getExercisesForPlan(planId: string) {
  return await prisma.exercise.findMany({
    where: { planId },
    orderBy: { createdAt: 'desc' },
  });
}



export async function updateExercise(id: string, data: Partial<{
  name: string;
  type: 'STRENGTH' | 'CARDIO';
  sets: number | null;
  reps: number | null;
  weight: number | null;
  duration: number | null;
  calories: number | null;
  distance: number | null;
}>) {
  const updated = await prisma.exercise.update({
    where: { id },
    data,
  });

  revalidatePath(`/workout/${updated.planId}`);
}

export async function deleteExercise(id: string) {
  const deleted = await prisma.exercise.delete({
    where: { id },
  });

  revalidatePath(`/workout/${deleted.planId}`);
}

```

//server actions
```
'use server'


import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';

// 1. Create a Workout Plan
export async function createWorkoutPlan(data: {
  name: string;
  userEmail: string;
}) {
  try {
    await prisma.workoutPlan.create({
      data: {
        name: data.name,
        userEmail: data.userEmail,
      },
    });

    revalidatePath('/'); // ✅ Make sure this is *inside* the try block
  } catch (error) {
    console.log('Create WorkoutPlan Error: ' + error);
    throw error;
  }
}


// 2. Get All Workout Plans (for a specific user)
export async function getWorkoutPlans(userEmail: string) {
  try {
    return await prisma.workoutPlan.findMany({
      where: { userEmail },
      include: {
        exercises: true, // optionally include associated exercises
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Get WorkoutPlans Error:', error);
    return [];
  }
}

// 3. Update a Workout Plan
export async function updateWorkoutPlan(id: string, data: { name: string }) {
  try {
    await prisma.workoutPlan.update({
      where: { id },
      data: {
        name: data.name,
      },
    });

  } catch (error) {
    console.error('Update WorkoutPlan Error:', error);
    throw error;
  }
      revalidatePath('/dashboard'); // or specific plan page

}

// 4. Delete a Workout Plan
export async function deleteWorkoutPlan(id: string) {
  try {
    await prisma.workoutPlan.delete({
      where: { id },
    });

  } catch (error) {
    console.error('Delete WorkoutPlan Error:', error);
    throw error;
  }
      revalidatePath('/dashboard');
    }

    // 5. Get a single Workout Plan by ID
export async function getWorkoutPlanById(id: string) {
  try {
    return await prisma.workoutPlan.findUnique({
      where: { id },
      include: {
        exercises: true, // Include exercises if you want them here
      },
    });
  } catch (error) {
    console.error('Get WorkoutPlan By ID Error:', error);
    return null;
  }
}

```


//HomePage

```

import { auth, signIn, signOut, } from "@/auth"
import { createWorkoutPlan, getWorkoutPlans } from "@/lib/workoutplan";

import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

// Server component: fetch workout plans
export default async function Home() {
  const user = await auth(); // adjust based on your auth system
  const userEmail = user?.user?.email

  if (!userEmail) {
    return <div>

               <form
             action={async () => {
              "use server"
               await signIn("google")
             }}
           >
            <button type="submit">Signin with Google</button>
           </form>
    </div>;
  }

  const workoutPlans = await getWorkoutPlans(userEmail);

  return (
    <main className="p-4 max-w-4xl mx-auto space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">My Workout Plans</h1>

        <NewWorkoutPlanForm userEmail={userEmail} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {workoutPlans.map((plan) => (
            <Link
              key={plan.id}
              href={`/workout/${plan.id}`}
              className="p-4 bg-white border border-gray-200 rounded shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold">{plan.name}</h2>
              <p className="text-sm text-gray-500">
                {new Date(plan.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Weekly Workout Log</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {getDaysOfWeek().map((day) => (
            <Link
              href={`/day/${day}`}
              key={day}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold">{day.split(" ")[0]}</h3>
              <p className="text-sm text-gray-500">{day}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

// Helper
function getDaysOfWeek() {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - today.getDay() + i);
    return day.toDateString();
  });
}

// Server Action Form Component
async function NewWorkoutPlanForm({ userEmail }: { userEmail: string }) {
  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;

    if (!name || !userEmail) return;

    await createWorkoutPlan({ name, userEmail });
    redirect("/"); // This is safe to call after revalidatePath happens inside createWorkoutPlan
  }

  return (
    <form action={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="name"
        placeholder="New plan name"
        className="border p-2 rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Create Workout Plan
      </button>
    </form>
  );
}


```

//workoutplan Id
```

import {
  getExercisesForPlan,
  createExercise,
  updateExercise,
  deleteExercise,
} from '@/lib/exercise';
import { getWorkoutPlanById } from '@/lib/workoutplan';
import { notFound } from 'next/navigation';
import React from 'react';

interface WorkoutPageProps {
  params: { id: string };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const workoutPlan = await getWorkoutPlanById(params.id);
  if (!workoutPlan) return notFound();

  const exercises = await getExercisesForPlan(params.id);

  return (
    <main className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{workoutPlan.name}</h1>

      <NewExerciseForm planId={workoutPlan.id} />

      <div className="space-y-4">
      {exercises.map((ex) => (
  <div key={ex.id} className="border p-4 rounded shadow bg-white space-y-2">
    <div className="flex justify-between items-center">
      <h2 className="font-semibold">Edit {ex.name}</h2>

      {/* DELETE FORM OUTSIDE */}
      <form
        action={async () => {
          'use server';
          await deleteExercise(ex.id);
        }}
      >
        <button type="submit" className="text-red-500 text-sm">
          Delete
        </button>
      </form>
    </div>

    {/* UPDATE FORM */}
    <form
      action={async (formData) => {
        'use server';

        const data = {
          name: formData.get('name') as string,
          type: formData.get('type') as 'STRENGTH' | 'CARDIO',
          sets: Number(formData.get('sets')) || null,
          reps: Number(formData.get('reps')) || null,
          weight: Number(formData.get('weight')) || null,
          duration: Number(formData.get('duration')) || null,
          calories: Number(formData.get('calories')) || null,
          distance: Number(formData.get('distance')) || null,
        };

        await updateExercise(ex.id, data);
      }}
      className="space-y-2"
    >
      <input
        name="name"
        defaultValue={ex.name}
        required
        className="border p-2 rounded w-full"
      />
      <select
        name="type"
        defaultValue={ex.type}
        className="border p-2 rounded w-full"
      >
        <option value="STRENGTH">Strength</option>
        <option value="CARDIO">Cardio</option>
      </select>

      <div className="grid grid-cols-2 gap-2">
        <input
          name="sets"
          defaultValue={ex.sets ?? ''}
          className="border p-2 rounded"
          placeholder="Sets"
        />
        <input
          name="reps"
          defaultValue={ex.reps ?? ''}
          className="border p-2 rounded"
          placeholder="Reps"
        />
        <input
          name="weight"
          defaultValue={ex.weight ?? ''}
          className="border p-2 rounded"
          placeholder="Weight"
        />
        <input
          name="duration"
          defaultValue={ex.duration ?? ''}
          className="border p-2 rounded"
          placeholder="Duration"
        />
        <input
          name="calories"
          defaultValue={ex.calories ?? ''}
          className="border p-2 rounded"
          placeholder="Calories"
        />
        <input
          name="distance"
          defaultValue={ex.distance ?? ''}
          className="border p-2 rounded"
          placeholder="Distance"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
      >
        Update Exercise
      </button>
    </form>
  </div>
))}

      </div>
    </main>
  );
}

// Create new exercise form
async function NewExerciseForm({ planId }: { planId: string }) {
  async function handleSubmit(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const type = formData.get('type') as 'STRENGTH' | 'CARDIO';

    const commonData = {
      planId,
      name,
      type,
      sets: Number(formData.get('sets')) || null,
      reps: Number(formData.get('reps')) || null,
      weight: Number(formData.get('weight')) || null,
      duration: Number(formData.get('duration')) || null,
      calories: Number(formData.get('calories')) || null,
      distance: Number(formData.get('distance')) || null,
    };

    await createExercise(commonData);
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-2 border p-4 rounded bg-gray-50"
    >
      <h3 className="font-semibold">Add Exercise</h3>
      <input
        type="text"
        name="name"
        placeholder="Exercise name"
        required
        className="border p-2 rounded w-full"
      />
      <select name="type" required className="border p-2 rounded w-full">
        <option value="STRENGTH">Strength</option>
        <option value="CARDIO">Cardio</option>
      </select>
      <div className="grid grid-cols-2 gap-2">
        <input type="number" name="sets" placeholder="Sets" className="border p-2 rounded" />
        <input type="number" name="reps" placeholder="Reps" className="border p-2 rounded" />
        <input type="number" name="weight" placeholder="Weight (lbs)" className="border p-2 rounded" />
        <input type="number" name="duration" placeholder="Duration (min)" className="border p-2 rounded" />
        <input type="number" name="calories" placeholder="Calories" className="border p-2 rounded" />
        <input type="number" name="distance" placeholder="Distance (km)" className="border p-2 rounded" />
      </div>
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}


```