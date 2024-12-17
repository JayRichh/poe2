import { motion } from "framer-motion";

export default function WavyGradient() {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute -inset-40 bg-gradient-to-b from-background to-background/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg 
          className="absolute inset-0 w-full h-[calc(100%+80px)] -translate-y-40"
          preserveAspectRatio="none"
          viewBox="0 0 1000 200"
        >
          <motion.path
            className="fill-background"
            initial={{
              d: "M0 0L0 200 1000 200 1000 0C900 66.7 700 100 500 100 300 100 100 66.7 0 0Z"
            }}
            animate={{
              d: [
                "M0 0L0 200 1000 200 1000 0C900 66.7 700 100 500 100 300 100 100 66.7 0 0Z",
                "M0 0L0 200 1000 200 1000 0C900 33.3 700 0 500 0 300 0 100 33.3 0 0Z",
                "M0 0L0 200 1000 200 1000 0C900 66.7 700 100 500 100 300 100 100 66.7 0 0Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
          />
        </svg>
        <svg 
          className="absolute inset-0 w-full h-[calc(100%+80px)] translate-y-40"
          preserveAspectRatio="none"
          viewBox="0 0 1000 200"
        >
          <motion.path
            className="fill-background"
            initial={{
              d: "M0 200L0 0 1000 0 1000 200C900 133.3 700 100 500 100 300 100 100 133.3 0 200Z"
            }}
            animate={{
              d: [
                "M0 200L0 0 1000 0 1000 200C900 133.3 700 100 500 100 300 100 100 133.3 0 200Z",
                "M0 200L0 0 1000 0 1000 200C900 166.7 700 200 500 200 300 200 100 166.7 0 200Z",
                "M0 200L0 0 1000 0 1000 200C900 133.3 700 100 500 100 300 100 100 133.3 0 200Z"
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
