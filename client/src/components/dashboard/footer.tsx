export default function DashboardFooter() {
  return (
    <footer className="bg-slate-700 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            data-testid="button-contact-us"
          >
            Contact Us
          </button>
          <p className="text-gray-300 text-sm text-center">
            © 2025 Marketing Analytics Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}