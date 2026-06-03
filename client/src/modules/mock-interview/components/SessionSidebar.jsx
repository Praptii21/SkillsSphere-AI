import React from "react";
import {
  Activity,
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  Loader2,
  MicOff,
  Info,
  AlertCircle
} from "lucide-react";

export const SessionSidebar = ({
  session,
  elapsedTime,
  socketStatus,
  recoveryMessage,
  requestStatus,
  mediaWarning,
  uploadStatus,
  currentIndex,
  totalQuestions,
  progressPercent,
  onExit,
}) => {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full lg:w-1/3 flex flex-col gap-6">
      <div className="flex justify-start">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors border-none bg-transparent cursor-pointer"
        >
          <AlertCircle size={16} />
          Exit Session
        </button>
      </div>
      
      {/* Status Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-white/10 flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-white/5 pb-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
            <Activity className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white capitalize">{session?.topic}</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 mt-1 inline-block uppercase tracking-wider">
              {session?.difficulty}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Session Time</span>
            <div className="flex items-center gap-2 font-mono text-lg font-bold text-slate-900 dark:text-white">
              <Clock size={16} className="text-slate-400" />
              {formatTime(elapsedTime)}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Connection</span>
            <div className="flex items-center gap-2">
              {socketStatus === "connected" ? <Wifi size={16} className="text-emerald-500" /> : <WifiOff size={16} className="text-red-500" />}
              <span className={`text-sm font-bold capitalize ${socketStatus === "connected" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                {socketStatus}
              </span>
            </div>
          </div>
          {recoveryMessage && (
            <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg flex items-center gap-2" role="status">
              <RefreshCw size={14} className={socketStatus === "connected" ? "" : "animate-spin"} /> {recoveryMessage}
            </div>
          )}
          {requestStatus && (
            <div className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 p-2 rounded-lg flex items-center gap-2" role="status">
              <Loader2 size={14} className="animate-spin" /> {requestStatus}
            </div>
          )}
          {mediaWarning && (
            <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-2 rounded-lg flex items-center gap-2" role="alert">
              <MicOff size={14} /> {mediaWarning}
            </div>
          )}
          {uploadStatus !== "idle" && (
            <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-white/5 p-2 rounded-lg">
              Audio status: <span className="font-bold capitalize">{uploadStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-white/10 flex flex-col gap-4">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Interview Progress</h3>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
          <Info size={14} /> Answer all questions to see final analytics.
        </p>
      </div>
    </div>
  );
};
export default SessionSidebar;
