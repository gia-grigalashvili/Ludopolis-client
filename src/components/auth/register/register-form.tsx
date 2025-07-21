export function RegisterForm() {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-bold mb-2 text-purple-200">
          NAME
        </label>
        <input
          type="text"
          className="cursor-target w-full px-4 py-3 border border-purple-400 rounded focus:outline-none focus:border-purple-300 transition-all bg-black/30 text-white placeholder-purple-300"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 text-purple-200">
          EMAIL
        </label>
        <input
          type="email"
          className="cursor-target w-full px-4 py-3 border border-purple-400 rounded focus:outline-none focus:border-purple-300 transition-all bg-black/30 text-white placeholder-purple-300"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 text-purple-200">
          PASSWORD
        </label>
        <input
          type="password"
          className="cursor-target w-full px-4 py-3 border border-purple-400 rounded focus:outline-none focus:border-purple-300 transition-all bg-black/30 text-white placeholder-purple-300"
          placeholder="Create a password"
        />
      </div>

      <div className="flex items-center">
        <label className="flex items-center cursor-target">
          <input
            type="checkbox"
            className="cursor-target mr-3 w-4 h-4"
            style={{ accentColor: "#a855f7" }}
          />
          <span className="text-sm text-purple-200">
            I agree to the
            <a
              href="#"
              className="cursor-target text-purple-400 hover:text-purple-300 transition-colors"
            >
              Terms of Service
            </a>
            and
            <a
              href="#"
              className="cursor-target text-purple-400 hover:text-purple-300 transition-colors"
            >
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="cursor-target w-full py-3 bg-purple-600 hover:bg-purple-700 border-2 border-white font-bold text-lg rounded transition-all transform hover:scale-105 text-white"
      >
        CREATE ACCOUNT
      </button>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-purple-500/50"></div>
        <span className="px-4 text-sm text-purple-300">OR</span>
        <div className="flex-1 h-px bg-purple-500/50"></div>
      </div>

      <button
        type="button"
        className="cursor-target w-full py-3 border-2 border-purple-400 hover:bg-purple-400/20 font-bold text-lg rounded transition-all text-purple-200"
      >
        🎮 SIGN UP WITH GOOGLE
      </button>
    </form>
  );
}
