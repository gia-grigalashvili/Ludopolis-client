export function LoginForm() {
  return (
    <form className="space-y-6">
      {/* Email Field */}
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

      {/* Password Field */}
      <div>
        <label className="block text-sm font-bold mb-2 text-purple-200">
          PASSWORD
        </label>
        <input
          type="password"
          className="cursor-target w-full px-4 py-3 border border-purple-400 rounded focus:outline-none focus:border-purple-300 transition-all bg-black/30 text-white placeholder-purple-300"
          placeholder="Enter your password"
        />
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-target">
          <input
            type="checkbox"
            className="cursor-target mr-2 w-4 h-4"
            style={{ accentColor: "#a855f7" }}
          />
          <span className="text-sm text-purple-200">Remember me</span>
        </label>
        <a
          href="#"
          className="cursor-target text-sm transition-colors hover:text-purple-300 text-purple-400"
        >
          Forgot password?
        </a>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        className="cursor-target w-full py-3 bg-purple-600 hover:bg-purple-700 border-2 border-white font-bold text-lg rounded transition-all transform hover:scale-105 text-white"
      >
        SIGN IN
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-purple-500/50"></div>
        <span className="px-4 text-sm text-purple-300">OR</span>
        <div className="flex-1 h-px bg-purple-500/50"></div>
      </div>

      {/* Social Login */}
      <button
        type="button"
        className="cursor-target w-full py-3 border-2 border-purple-400 hover:bg-purple-400/20 font-bold text-lg rounded transition-all text-purple-200"
      >
        🎮 CONTINUE WITH GOOGLE
      </button>
    </form>
  );
}
