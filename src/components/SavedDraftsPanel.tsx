import React, { useState } from 'react';
import { Language, SavedDraft } from '../types';
import { FileText, Trash2, Edit3, Copy, Download } from 'lucide-react';

interface SavedDraftsPanelProps {
  language: Language;
  drafts: SavedDraft[];
  onDelete?: (id: string) => void;
  onEdit?: (draft: SavedDraft) => void;
}

export const SavedDraftsPanel: React.FC<SavedDraftsPanelProps> = ({
  language,
  drafts,
  onDelete,
  onEdit
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (draft: SavedDraft) => {
    const text = language === 'ko' ? draft.bulletKo : draft.bulletEn;
    navigator.clipboard.writeText(text);
    setCopiedId(draft.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ko'
      ? date.toLocaleDateString('ko-KR')
      : date.toLocaleDateString('en-US');
  };

  return (
    <div className="bg-white rounded-xl p-6 card-shadow border border-[#c5c6cd]/50">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-[#1e293b]" />
        <h3 className="text-lg font-bold text-[#091426]">
          {language === 'ko' ? '저장된 자기소개서 초안' : 'Saved Draft Bullets'}
        </h3>
        <span className="ml-auto text-xs font-bold bg-[#dce9ff] text-[#1e293b] px-2.5 py-1 rounded-full">
          {drafts.length}개
        </span>
      </div>

      {drafts.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">
            {language === 'ko' ? '저장된 초안이 없습니다.' : 'No saved drafts yet.'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'ko' ? '매칭 화면에서 자기소개서를 생성하고 저장하세요.' : 'Create and save drafts from the Matching screen.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="flex flex-col p-4 rounded-lg border border-slate-200 hover:border-[#1e293b] transition-colors bg-[#f8f9ff]/50"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-bold text-[#091426]">{draft.companyName}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'ko' ? draft.titleKo : draft.titleEn}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">
                  {formatDate(draft.createdAt)}
                </span>
              </div>

              <p className="text-xs text-[#45474c] mb-3 p-2 bg-white rounded border border-slate-100">
                {language === 'ko' ? draft.bulletKo : draft.bulletEn}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(draft)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-1.5 px-2 rounded-lg border border-[#10B981] bg-[#f0fdf4] text-[#006c49] hover:bg-[#dcfce7] transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedId === draft.id ? '복사됨!' : (language === 'ko' ? '복사' : 'Copy')}
                </button>

                {onEdit && (
                  <button
                    onClick={() => onEdit(draft)}
                    className="flex items-center justify-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg border border-slate-300 bg-white text-[#1e293b] hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={() => onDelete(draft.id)}
                    className="flex items-center justify-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg border border-red-300 bg-[#fef2f2] text-red-600 hover:bg-[#fee2e2] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
