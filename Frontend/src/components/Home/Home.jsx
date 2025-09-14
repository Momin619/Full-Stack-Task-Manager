import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 flex items-center justify-center px-6 py-16 text-white">
        <div className="max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Organize Your Day with <br />
            <span className="text-yellow-300">TaskMaster</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 text-lg md:text-xl text-gray-100"
          >
            Boost your productivity, manage tasks effortlessly, and stay on top
            of your goals. Sign up today and start managing your tasks like a
            pro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link
              to="/signup"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-100 text-green-700 px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            Why Choose <span className="text-green-600">TaskMaster</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-green-600">
                Easy to Use
              </h3>
              <p className="text-gray-600 mt-3">
                Simple interface designed for speed and clarity. Add, edit, and
                complete tasks in just a few clicks.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-green-600">
                Stay Organized
              </h3>
              <p className="text-gray-600 mt-3">
                Categorize tasks, set priorities, and always keep track of your
                progress.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-green-600">
                Access Anywhere
              </h3>
              <p className="text-gray-600 mt-3">
                Manage your tasks from any device, whether at home, work, or on
                the go.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Take Control?</h2>
        <p className="mt-3 text-lg">
          Join TaskMaster today and achieve your goals with ease.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
