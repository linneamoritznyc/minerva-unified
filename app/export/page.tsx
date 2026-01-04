'use client';

import { storage } from '@/lib/storage';
import Link from 'next/link';

export default function ExportPage() {
  const handleExportJSON = () => {
    const data = storage.exportAll();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minerva-ambassador-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (confirm('This will replace all existing data. Are you sure?')) {
          storage.importAll(data);
          alert('Data imported successfully! Please refresh the page.');
          window.location.reload();
        }
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-2 block">← Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-900">Export & Import Data</h1>
          <p className="text-gray-600 mt-2">
            Backup your data or transfer it between devices
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Export Data</h2>
          <p className="text-gray-600 mb-6">
            Download all your data (schools, counselors, students, visits, travel plans, and interactions) 
            as a JSON file. This file can be used as a backup or imported on another device.
          </p>
          <button
            onClick={handleExportJSON}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Export All Data (JSON)
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Import Data</h2>
          <p className="text-gray-600 mb-6">
            Import data from a previously exported JSON file. 
            <strong className="text-red-600"> Warning: This will replace all existing data!</strong>
          </p>
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-yellow-800">
            <li>• <strong>Regular Backups:</strong> Export your data regularly to prevent data loss</li>
            <li>• <strong>Browser Storage:</strong> Data is stored in your browser's local storage. Clearing browser data will delete all information</li>
            <li>• <strong>Device Transfer:</strong> Use export/import to transfer data between computers or browsers</li>
            <li>• <strong>Privacy:</strong> Keep exported files secure as they contain sensitive contact information</li>
            <li>• <strong>Compatibility:</strong> Only import files that were exported from this application</li>
          </ul>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Individual Exports</h3>
          <p className="text-sm text-blue-800 mb-4">
            You can also export individual datasets as CSV files from their respective pages:
          </p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <Link href="/schools" className="underline hover:text-blue-900">Schools Database</Link> - Export schools list</li>
            <li>• <Link href="/counselors" className="underline hover:text-blue-900">Counselors Database</Link> - Export counselor contacts</li>
            <li>• <Link href="/students" className="underline hover:text-blue-900">Students Database</Link> - Export student leads</li>
            <li>• <Link href="/visits" className="underline hover:text-blue-900">Visits & Events</Link> - Export visit schedule</li>
            <li>• <Link href="/travel" className="underline hover:text-blue-900">Travel Planning</Link> - Export travel plans</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
