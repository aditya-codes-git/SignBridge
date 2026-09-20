import React, { useState } from 'react';
import { Search, Filter, BookOpen, Hand, Sparkles } from 'lucide-react';
import { SUPPORTED_VOCABULARY } from '../data/vocabulary';
import VocabularyGrid from '../components/VocabularyGrid';
import VocabularyModal from '../components/VocabularyModal';

export default function Vocabulary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inspectSign, setInspectSign] = useState(null);

  const categories = ['All', 'Greetings', 'Daily Needs', 'Affirmations', 'Courtesy', 'Emergency & Support'];

  const filteredVocabulary = SUPPORTED_VOCABULARY.filter((sign) => {
    const matchesSearch = sign.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Supported ISL Vocabulary
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Currently trained on 8 high-priority Indian Sign Language gestures for everyday assistive communication.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sign or gesture..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Signs */}
      {filteredVocabulary.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto stroke-[1.5]" />
          <h3 className="font-semibold text-slate-700">No matching gestures found</h3>
          <p className="text-xs text-slate-500">
            Try searching for "Hello", "Water", "Help", or resetting the category filter.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline pt-1"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVocabulary.map((sign) => (
            <div
              key={sign.id}
              onClick={() => setInspectSign(sign)}
              className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 p-5 shadow-xs hover:shadow-card-hover transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 flex items-center justify-center text-slate-600 group-hover:text-blue-600 transition-colors">
                    <Hand className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                    Supported
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                  {sign.label}
                </h3>
                <span className="text-xs font-medium text-slate-400 block mt-0.5">
                  {sign.category}
                </span>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {sign.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-blue-600 transition-colors">
                <span className="text-[11px] font-semibold">
                  Threshold: 70%
                </span>
                <span className="font-semibold text-[11px] underline">
                  Practice &gt;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {inspectSign && (
        <VocabularyModal
          sign={inspectSign}
          onClose={() => setInspectSign(null)}
        />
      )}
    </div>
  );
}
