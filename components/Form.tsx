'use client';

import { sendEmail } from '@/app/actions/actions';
import { useState } from 'react';

const Form = () => {
  const [error, setError] = useState('');
  const clientAction = async (formData: FormData) => {
    const res = await sendEmail(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setError('');
    }
  };

  return (
    <form
      action={clientAction}
      className="flex flex-col items-center gap-4 w-full max-w-sm">
      <h1 className="text-2xl font-semibold">Sign Up</h1>

      <div className="flex flex-col w-full">
        <label htmlFor="name" className="text-sm mb-1">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First name"
          required
          className="border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="name" className="text-sm mb-1">
          Last name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          required
          className="border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="email" className="text-sm mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
          className="border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Sign Up
      </button>
    </form>
  );
};

export default Form;
