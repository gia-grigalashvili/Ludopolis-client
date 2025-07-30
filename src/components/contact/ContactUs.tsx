import React, { useRef, useState } from "react";
import {
  Mail,
  Instagram,
  Linkedin,
  Send,
  User,
  MessageCircle,
  Sparkles,
  Zap,
  Star,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_5z0f5u6",
        "template_1s8kvex",
        form.current,
        "BAv7Z_KN3xf9qrXNd"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          setIsLoading(false);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          console.log(error.text);
          setIsLoading(false);
        }
      );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "user_name") {
      setFormData({ ...formData, name: value });
    } else if (name === "user_email") {
      setFormData({ ...formData, email: value });
    } else if (name === "message") {
      setFormData({ ...formData, message: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900 text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-fuchsia-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-30"></div>
      </div>

      <div className="absolute top-16 left-16 text-fuchsia-400/20 animate-pulse">
        <Sparkles size={24} />
      </div>
      <div className="absolute bottom-24 right-24 text-purple-400/20 animate-bounce">
        <Zap size={28} />
      </div>
      <div className="absolute top-1/4 right-16 text-pink-400/20 animate-pulse">
        <Star size={20} />
      </div>

      <div className="fixed left-6 top-1/2 -translate-y-1/2 rotate-[-90deg] text-fuchsia-500 text-sm tracking-[0.3em] font-bold flex items-center space-x-2">
        <MessageCircle size={16} className="rotate-90" />
        <span>LET'S TALK</span>
      </div>

      <div className="fixed top-32 right-8 flex flex-col space-y-4">
        <div className="h-3 w-3 rounded-full bg-green-400 animate-ping opacity-60" />
        <div className="h-2 w-2 rounded-full bg-fuchsia-500 animate-pulse" />
        <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" />
      </div>

      <div className="w-full max-w-lg bg-gray-900/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl shadow-fuchsia-500/20 border border-gray-700/50 relative z-10">
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-fuchsia-500/30 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-500/30 rounded-bl-lg"></div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-pink-500 mb-4 uppercase tracking-[0.2em]">
            Contact Us
          </h2>
          <p className="text-gray-400 text-sm">
            Ready to start your gaming journey? Let's connect!
          </p>
        </div>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="relative">
            <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              name="user_name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm rounded-lg outline-none focus:ring-2 focus:ring-fuchsia-500 focus:bg-gray-800 transition-all duration-300 border border-gray-600/30"
            />
          </div>

          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              name="user_email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm rounded-lg outline-none focus:ring-2 focus:ring-fuchsia-500 focus:bg-gray-800 transition-all duration-300 border border-gray-600/30"
            />
          </div>

          <div className="relative">
            <MessageCircle
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your gaming ideas..."
              required
              rows={5}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm rounded-lg outline-none focus:ring-2 focus:ring-fuchsia-500 focus:bg-gray-800 transition-all duration-300 resize-none border border-gray-600/30"
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={sendEmail}
          disabled={isLoading}
          className="w-full mt-8 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-fuchsia-700 hover:to-purple-700 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-fuchsia-500/30 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Send Message</span>
            </>
          )}
        </button>

        {success && (
          <div className="text-green-400 font-medium text-center flex items-center justify-center space-x-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-1 bg-white rounded rotate-45 translate-x-0.5"></div>
            </div>
            <span>Message sent successfully! We'll get back to you soon.</span>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-gray-700/50">
          <p className="text-center text-gray-400 text-sm mb-6">
            Connect with us
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href="mailto:contact@ludopolis.com"
              className="flex flex-col items-center group hover:scale-110 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                <Mail size={20} />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-blue-400">
                Email
              </span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-110 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-2 group-hover:shadow-lg group-hover:shadow-pink-500/50">
                <Instagram size={20} />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-pink-400">
                Instagram
              </span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group hover:scale-110 transition-transform duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-2 group-hover:shadow-lg group-hover:shadow-blue-600/50">
                <Linkedin size={20} />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-blue-400">
                LinkedIn
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Ready to level up? We're here to help bring your gaming vision to
            life.
          </p>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-fuchsia-500/60 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-purple-500/60 rounded-full animate-pulse delay-75"></div>
        <div className="w-2 h-2 bg-pink-500/60 rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  );
}
