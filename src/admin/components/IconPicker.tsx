
import React, { useState, useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ALL_ICONS, getIconData } from '../../lib/icons';

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Get the icon component for the current value
    const SelectedIcon = getIconData(value);
    const { Search01Icon, Cancel01Icon } = ALL_ICONS;

    const filteredIcons = useMemo(() => {
        if (!search) return Object.keys(ALL_ICONS);
        return Object.keys(ALL_ICONS).filter(name => 
            name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <div className="relative">
            <div className="flex items-center gap-2">
                <div className="border rounded p-2 bg-secondary flex items-center justify-center w-10 h-10">
                    {SelectedIcon && <HugeiconsIcon icon={SelectedIcon} className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                    <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full justify-start text-left font-normal"
                        onClick={() => setIsOpen(true)}
                    >
                        {value || "Select Icon..."}
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setIsOpen(false)}>
                    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Select Icon</h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
                            </Button>
                        </div>
                        
                        <div className="p-4 border-b">
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    <HugeiconsIcon icon={Search01Icon} className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <Input 
                                    placeholder="Search icons (e.g. home, user, arrow)..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9"
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-6 sm:grid-cols-8 gap-2 min-h-[300px]">
                            {filteredIcons.map((iconName) => {
                                const IconComponent = ALL_ICONS[iconName];
                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        className={`p-2 rounded hover:bg-accent hover:text-accent-foreground flex flex-col items-center gap-2 transition-all ${value === iconName ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground'}`}
                                        onClick={() => {
                                            onChange(iconName);
                                            setIsOpen(false);
                                        }}
                                        title={iconName}
                                    >
                                        <HugeiconsIcon icon={IconComponent} className="w-6 h-6" />
                                    </button>
                                );
                            })}
                            {filteredIcons.length === 0 && (
                                <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                                    <p>No icons found for "{search}"</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-2 border-t text-xs text-center text-muted-foreground">
                            {filteredIcons.length} icons available
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
