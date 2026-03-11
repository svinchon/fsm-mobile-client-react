import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type GlobalStatusTone = 'primary' | 'success' | 'warning' | 'danger' | 'medium' | 'light';

export type GlobalStatusState = {
  message: string;
  tone: GlobalStatusTone;
  visible: boolean;
  elapsedSeconds: number;
  showCountdown: boolean;
};

type GlobalStatusContextValue = {
  status: GlobalStatusState;
  setStatus: (
    message: string,
    tone?: GlobalStatusTone,
    durationMs?: number,
    showCountdown?: boolean
  ) => void;
  clearStatus: () => void;
};

const GlobalStatusContext = createContext<GlobalStatusContextValue | undefined>(undefined);

export const GlobalStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatusState] = useState<GlobalStatusState>({
    message: '< status message area >',
    tone: 'light',
    visible: true,
    elapsedSeconds: 0,
    showCountdown: false,
  });
  const autoClearTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elapsedInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const setStatus = useCallback((
    message: string,
    tone: GlobalStatusTone = 'light',
    durationMs: number = 60000,
    showCountdown: boolean = false
  ) => {
    if (autoClearTimeout.current) {
      clearTimeout(autoClearTimeout.current);
      autoClearTimeout.current = null;
    }

    setStatusState({
      message,
      tone,
      visible: message.trim().length > 0,
      elapsedSeconds: 0,
      showCountdown,
    });

    if (message.trim().length > 0 && showCountdown) {
      if (elapsedInterval.current) {
        clearInterval(elapsedInterval.current);
      }
      elapsedInterval.current = setInterval(() => {
        setStatusState((prev) => ({ ...prev, elapsedSeconds: prev.elapsedSeconds + 1 }));
      }, 1000);
    }

    if (message.trim().length > 0 && durationMs > 0) {
      autoClearTimeout.current = setTimeout(() => {
        setStatusState((prev) => ({
          ...prev,
          message: '<status area>',
          tone: 'light',
          visible: true,
          elapsedSeconds: 0,
          showCountdown: false,
        }));
        autoClearTimeout.current = null;
        if (elapsedInterval.current) {
          clearInterval(elapsedInterval.current);
          elapsedInterval.current = null;
        }
      }, durationMs);
    }
  }, []);

  const clearStatus = useCallback(() => {
    if (autoClearTimeout.current) {
      clearTimeout(autoClearTimeout.current);
      autoClearTimeout.current = null;
    }
    if (elapsedInterval.current) {
      clearInterval(elapsedInterval.current);
      elapsedInterval.current = null;
    }
    setStatusState((prev) => ({
      ...prev,
      message: '<status area>',
      tone: 'light',
      visible: true,
      elapsedSeconds: 0,
      showCountdown: false,
    }));
  }, []);

  const value = useMemo(() => ({ status, setStatus, clearStatus }), [status, setStatus, clearStatus]);

  return <GlobalStatusContext.Provider value={value}>{children}</GlobalStatusContext.Provider>;
};

export const useGlobalStatus = () => {
  const ctx = useContext(GlobalStatusContext);
  if (!ctx) {
    throw new Error('useGlobalStatus must be used within GlobalStatusProvider');
  }
  return ctx;
};
