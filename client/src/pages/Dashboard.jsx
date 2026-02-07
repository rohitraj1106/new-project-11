import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const statusColors = {
  pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200',
  in_progress: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
  completed: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/tasks/dashboard')
      .then(({ data }) => setData(data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500" />
      </div>
    );
  }

  const { summary = {}, recentActivity = [] } = data || {};

  const cards = [
    { label: 'Total Tasks', value: summary.total ?? 0, className: 'text-primary-600 dark:text-primary-400' },
    { label: 'Completed', value: summary.completed ?? 0, className: 'text-green-600 dark:text-green-400' },
    { label: 'In Progress', value: summary.inProgress ?? 0, className: 'text-blue-600 dark:text-blue-400' },
    { label: 'Pending', value: summary.pending ?? 0, className: 'text-amber-600 dark:text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your tasks</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, className }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className={`mt-1 text-2xl font-bold ${className}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
          <Link
            to="/tasks"
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p>No tasks yet.</p>
              <Link
                to="/tasks/new"
                className="mt-2 inline-block text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                Create your first task
              </Link>
            </div>
          ) : (
            recentActivity.map((task) => (
              <Link
                key={task._id}
                to={`/tasks/${task._id}/edit`}
                className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-gray-800 dark:text-white truncate">
                    {task.title}
                  </span>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status] || ''}`}
                  >
                    {task.status?.replace('_', ' ')}
                  </span>
                </div>
                {task.description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {task.description}
                  </p>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
