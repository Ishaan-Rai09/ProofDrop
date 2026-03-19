"use client";
import dynamic from 'next/dynamic';

const LiveTracker = dynamic(() => import('./LiveTracker'), {
  ssr: false, 
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gray-900 animate-pulse rounded-xl border border-gray-800 flex items-center justify-center">
      <div className="text-gray-500 font-mono text-sm">Loading Live Map Data...</div>
    </div>
  )
});

export default function LiveTrackerWrapper(props: any) {
  return <LiveTracker {...props} />;
}