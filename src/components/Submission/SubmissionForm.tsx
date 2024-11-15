import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubmissionForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate back to battle page after submission
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
          Track Title
        </label>
        <input
          type="text"
          id="title"
          required
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
          placeholder="Give your beat a name"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">
          Description (Optional)
        </label>
        <textarea
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500"
          placeholder="Tell us about your track..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">
          Genre Tags
        </label>
        <div className="mt-1 flex flex-wrap gap-2">
          {['Hip Hop', 'Trap', 'Lo-Fi', 'House'].map((tag) => (
            <button
              key={tag}
              type="button"
              className="px-3 py-1 rounded-full text-sm bg-gray-700 hover:bg-gray-600 text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-medium transition-colors ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Track'}
        </button>
      </div>
    </form>
  );
}