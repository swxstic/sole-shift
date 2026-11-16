import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

const categories = ['All', 'lifestyle', 'basketball', 'running', 'skate', 'trail'];
const brands = ['Nike', 'Adidas', 'New Balance', 'ASICS', 'Converse', 'Vans', 'Salomon', 'On Running', 'Puma'];
const genders = ['men', 'women', 'unisex'];
const priceRanges = [
  { label: 'Under ₹8,000', min: 0, max: 8000 },
  { label: '₹8,000 – ₹12,000', min: 8000, max: 12000 },
  { label: '₹12,000 – ₹18,000', min: 12000, max: 18000 },
  { label: 'Above ₹18,000', min: 18000, max: Infinity },
];

function FilterGroup({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/5 pb-4 mb-4">
      <button
        className="flex items-center justify-between w-full text-left mb-3"
        onClick={() => setOpen(!open)}
      >
        <span className="font-mono text-xs text-text-muted uppercase tracking-widest">{title}</span>
        {open ? <ChevronUp size={12} className="text-text-muted" /> : <ChevronDown size={12} className="text-text-muted" />}
      </button>
      {open && children}
    </div>
  );
}

export default function FilterPanel({ filters, onChange }) {
  const toggle = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const setCategory = (cat) => onChange({ ...filters, category: cat === 'All' ? '' : cat });

  return (
    <aside className="w-full">
      {/* Active filters */}
      {Object.entries(filters).some(([k, v]) => v && (Array.isArray(v) ? v.length > 0 : true)) && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Active Filters</span>
            <button
              onClick={() => onChange({ category: '', brands: [], genders: [], priceRange: null, sortBy: 'popularity' })}
              className="font-mono text-[10px] text-accent-red uppercase tracking-widest hover:underline"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Category */}
      <FilterGroup title="Category">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${
                (filters.category === cat || (cat === 'All' && !filters.category))
                  ? 'border-accent-red bg-accent-red/10 text-accent-red'
                  : 'border-white/10 text-text-muted hover:border-white/30 hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Brand */}
      <FilterGroup title="Brand">
        <div className="space-y-2">
          {brands.map((brand) => {
            const checked = (filters.brands || []).includes(brand);
            return (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                    checked ? 'border-accent-red bg-accent-red' : 'border-white/20 group-hover:border-white/40'
                  }`}
                  onClick={() => toggle('brands', brand)}
                >
                  {checked && <span className="text-white text-[8px]">✓</span>}
                </div>
                <span
                  className={`text-sm transition-colors ${checked ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'}`}
                  onClick={() => toggle('brands', brand)}
                >
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      {/* Gender */}
      <FilterGroup title="Gender">
        <div className="flex gap-2">
          {genders.map((g) => (
            <button
              key={g}
              onClick={() => toggle('genders', g)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border capitalize transition-colors ${
                (filters.genders || []).includes(g)
                  ? 'border-accent-red bg-accent-red/10 text-accent-red'
                  : 'border-white/10 text-text-muted hover:border-white/30 hover:text-text-primary'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price Range">
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isActive =
              filters.priceRange &&
              filters.priceRange.min === range.min &&
              filters.priceRange.max === range.max;
            return (
              <button
                key={range.label}
                onClick={() => onChange({ ...filters, priceRange: isActive ? null : range })}
                className={`w-full text-left font-mono text-xs px-3 py-2 border transition-colors ${
                  isActive
                    ? 'border-accent-red bg-accent-red/10 text-accent-red'
                    : 'border-white/10 text-text-muted hover:border-white/30 hover:text-text-primary'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </aside>
  );
}
