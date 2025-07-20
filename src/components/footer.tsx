export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-purple-500/30 backdrop-blur-sm bg-black/20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-purple-500 border border-white transform rotate-12"></div>
          <span className="text-xl font-bold text-purple-100">LUDOPOLIS</span>
        </div>
        <p className="text-purple-300 mb-4">
          Your premier destination for classic cardboard gaming experiences
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:text-purple-300 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-purple-300 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-purple-300 transition-colors">
            Contact Us
          </a>
        </div>
        <p className="text-purple-400 text-xs mt-4">
          © 2024 Ludopolis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
