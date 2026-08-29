import { useState, useEffect } from "react";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";

function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    let timer;

    const handleOnline = () => {
      setIsOnline(true);
      setShowRestored(true);
      timer = setTimeout(() => {
        setShowRestored(false);
      }, 3500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (isOnline && !showRestored) {
    return null;
  }

  if (showRestored) {
    return (
      <aside aria-label="Connection Restored Notification" className="offline-banner online-restored" role="status" aria-live="polite">
        <div className="offline-banner-content">
          <Wifi size={18} className="offline-banner-icon" />
          <span>Back online! Your internet connection has been restored.</span>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Offline Notification" className="offline-banner offline-active" role="alert" aria-live="assertive">
      <div className="offline-banner-content">
        <WifiOff size={18} className="offline-banner-icon pulse" />
        <span>No internet connection. Some features may not work offline.</span>
      </div>
      <button
        type="button"
        className="offline-retry-button"
        onClick={() => {
          if (navigator.onLine) {
            setIsOnline(true);
          } else {
            window.location.reload();
          }
        }}
      >
        <RefreshCw size={14} />
        <span>Retry</span>
      </button>
    </aside>
  );
}

export default OfflineBanner;
