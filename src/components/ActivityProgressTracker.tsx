import React, { useState } from 'react';
import { Language, DevelopmentActivity, ActivityProgress } from '../types';
import { CheckCircle2, Circle, Play, Zap } from 'lucide-react';

interface ActivityProgressTrackerProps {
  language: Language;
  activities: DevelopmentActivity[];
  progressData: ActivityProgress[];
  onProgressUpdate?: (id: string, progress: ActivityProgress) => void;
}

export const ActivityProgressTracker: React.FC<ActivityProgressTrackerProps> = ({
  language,
  activities,
  progressData,
  onProgressUpdate
}) => {
  const getActivityProgress = (activityId: string) => {
    return progressData.find(p => p.activityId === activityId);
  };

  const handleStatusChange = (activityId: string, newStatus: 'not_started' | 'in_progress' | 'completed') => {
    const progress = getActivityProgress(activityId);
    if (progress && onProgressUpdate) {
      onProgressUpdate(activityId, {
        ...progress,
        status: newStatus,
        progressPercent: newStatus === 'completed' ? 100 : (progress.progressPercent || 0)
      });
    }
  };

  const completedCount = progressData.filter(p => p.status === 'completed').length;

  return (
    <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-[#f97316]" />
        <h3 className="text-lg font-bold text-[#091426]">
          {language === 'ko' ? '보완 활동 진행도' : 'Development Activity Progress'}
        </h3>
        <span className="ml-auto text-xs font-bold bg-[#dbeafe] text-[#0c4a6e] px-2.5 py-1 rounded-full">
          {completedCount}/{activities.length}
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const progress = getActivityProgress(activity.id);
          const status = progress?.status || 'not_started';
          const progressPercent = progress?.progressPercent || 0;

          return (
            <div
              key={activity.id}
              className="p-4 rounded-lg border border-slate-200 hover:border-[#f97316] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  ) : status === 'in_progress' ? (
                    <Play className="w-5 h-5 text-[#f97316] flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#091426]">
                      {language === 'ko' ? activity.titleKo : activity.titleEn}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'ko' ? activity.categoryKo : activity.categoryEn} • {activity.duration}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${
                  status === 'completed'
                    ? 'bg-[#dcfce7] text-[#006c49]'
                    : status === 'in_progress'
                    ? 'bg-[#fed7aa] text-[#92400e]'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {status === 'completed' && (language === 'ko' ? '완료' : 'Completed')}
                  {status === 'in_progress' && (language === 'ko' ? '진행 중' : 'In Progress')}
                  {status === 'not_started' && (language === 'ko' ? '미시작' : 'Not Started')}
                </div>
              </div>

              {/* Progress Bar */}
              {status !== 'not_started' && (
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600">
                      {language === 'ko' ? '진행률' : 'Progress'}
                    </span>
                    <span className="text-xs font-bold text-[#f97316]">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#f97316] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {status !== 'not_started' && (
                  <button
                    onClick={() => handleStatusChange(activity.id, 'not_started')}
                    className="flex-1 text-xs font-bold py-1.5 px-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    {language === 'ko' ? '미시작' : 'Reset'}
                  </button>
                )}
                {status !== 'in_progress' && status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(activity.id, 'in_progress')}
                    className="flex-1 text-xs font-bold py-1.5 px-2 rounded-lg border border-[#f97316] bg-[#fffbeb] text-[#92400e] hover:bg-[#fef3c7] transition-colors"
                  >
                    {language === 'ko' ? '시작' : 'Start'}
                  </button>
                )}
                {status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange(activity.id, 'completed')}
                    className="flex-1 text-xs font-bold py-1.5 px-2 rounded-lg border border-[#10B981] bg-[#f0fdf4] text-[#006c49] hover:bg-[#dcfce7] transition-colors"
                  >
                    {language === 'ko' ? '완료' : 'Complete'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="bg-[#fffbeb] p-4 rounded-lg border border-[#fde68a]">
          <p className="text-xs text-[#92400e] font-medium">
            {language === 'ko'
              ? `현재 ${completedCount}/${activities.length}개 활동을 진행 중입니다. 약점 보완을 위해 꾸준히 학습해보세요!`
              : `You've completed ${completedCount} out of ${activities.length} development activities. Keep building your skills!`}
          </p>
        </div>
      </div>
    </div>
  );
};
