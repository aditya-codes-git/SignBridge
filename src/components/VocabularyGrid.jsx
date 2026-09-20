import React, { useState } from 'react';
import { 
  Hand, 
  HeartHandshake, 
  LifeBuoy, 
  CheckCircle2, 
  XCircle, 
  Droplets, 
  Utensils, 
  Sun,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { SUPPORTED_VOCABULARY } from '../data/vocabulary';
import VocabularyModal from './VocabularyModal';

const ICON_MAP = {
  Hand,
  HeartHandshake,
  LifeBuoy,
  CheckCircle2,
  XCircle,
  Droplets,
  Utensils,
  Sun,
};

export default function VocabularyGrid({ compact = false, onSelectSign = null }) {
  const [selectedSign, setSelectedSign] = useState(null);

  const handleCardClick = (sign) => {
    if (onSelectSign) {
      onSelectSign(sign);
    } else {
      setSelectedSign(sign);
    }
  };

  return (
    <>
      <div className={`grid ${compact ? 'grid-cols-2 sm:grid-cols-4 gap-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}`}>
        {SUPPORTED_VOCABULARY.map((sign) => {
          const IconComponent = ICON_MAP[sign.iconName] || Hand;
          return (
            <div
              key={sign.id}
              onClick={() => handleCardClick(sign)}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-4 shadow-xs hover:shadow-card-hover transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 flex items-center justify-center text-slate-600 group-hover:text-blue-600 transition-colors">
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                    Supported
                  </span>
                </div>

                <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                  {sign.label}
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                  {sign.category}
                </div>

                {!compact && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {sign.description}
                  </p>
                )}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-600 transition-colors">
                <span className="text-[11px] font-semibold">
                  Threshold: 70%
                </span>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold">
                  <span>Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedSign && (
        <VocabularyModal
          sign={selectedSign}
          onClose={() => setSelectedSign(null)}
        />
      )}
    </>
  );
}
