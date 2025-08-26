import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background" data-id="8wzdket3q" data-path="src/pages/NotFound.tsx">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 p-8" data-id="1ot5qe6x1" data-path="src/pages/NotFound.tsx">

        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} data-id="erdfless4" data-path="src/pages/NotFound.tsx">

          <h1 className="text-8xl font-bold text-primary" data-id="6cmw27c8q" data-path="src/pages/NotFound.tsx">404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4" data-id="ajaw8z5i1" data-path="src/pages/NotFound.tsx">

          <h2 className="text-2xl font-semibold tracking-tight" data-id="p63quem81" data-path="src/pages/NotFound.tsx">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground" data-id="5oojyadml" data-path="src/pages/NotFound.tsx">
            Maaf, halaman yang Anda cari tidak ada atau telah dihapus.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }} data-id="gzcn7fcwp" data-path="src/pages/NotFound.tsx">

          <Button asChild variant="default" size="lg" data-id="ecajirypw" data-path="src/pages/NotFound.tsx">
            <a href="/" data-id="2oswwsnlo" data-path="src/pages/NotFound.tsx">Kembali ke Beranda</a>
          </Button>
        </motion.div>
      </motion.div>
    </div>);

};

export default NotFound;