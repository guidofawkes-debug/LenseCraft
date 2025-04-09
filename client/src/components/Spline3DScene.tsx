import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Using dynamic import for Spline to prevent SSR issues
const Spline = ({ onLoad, scene, className }: any) => {
  const [SplineComponent, setSplineComponent] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    
    const loadSpline = async () => {
      try {
        const splineModule = await import('@splinetool/react-spline');
        if (isMounted) {
          setSplineComponent(() => splineModule.default);
        }
      } catch (e) {
        console.error("Failed to load Spline component:", e);
        if (isMounted) {
          setError(true);
        }
      }
    };
    
    loadSpline();
    
    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <div className="w-full h-full flex items-center justify-center text-neutral-500">3D element unavailable</div>;
  }

  if (!SplineComponent) {
    return <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>;
  }

  return (
    <SplineComponent 
      scene={scene} 
      onLoad={onLoad}
      className={className}
      onError={(err: any) => {
        console.warn("Spline scene error:", err);
        setError(true);
      }}
    />
  );
};

interface Spline3DSceneProps {
  scene: string;
  className?: string;
  height?: string;
}

const Spline3DScene = ({ scene, className = "", height = "600px" }: Spline3DSceneProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Add a fallback mechanism if loading takes too long
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError(true);
        console.warn("Spline scene loading timeout:", scene);
      }
    }, 8000); // 8 second timeout

    return () => clearTimeout(timeoutId);
  }, [loading, scene]);

  // Create a simple animation background fallback
  if (error) {
    return (
      <div 
        className={`relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/20 ${className}`} 
        style={{ height }}
      >
        <div className="absolute inset-0 bg-grid-white/5"></div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      <Spline 
        scene={scene}
        onLoad={() => setLoading(false)}
        className="w-full h-full"
      />
    </div>
  );
};

export default Spline3DScene;