import React, { useRef, useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Camera, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DEMO_EXAMPLES, generateChatScreenshot } from '../data/examples';
import { DemoExample } from '../types';

interface UploadCardProps {
  onImageSelected: (base64: string, mimeType: string, hint?: string) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Clipboard paste support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onImageSelected(base64, file.type, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleExampleSelect = (example: DemoExample) => {
    // Generate realistic simulated chat screenshot data URL
    const simulatedBase64 = generateChatScreenshot(example);
    onImageSelected(simulatedBase64, 'image/png', `${example.title} (${example.tag})`);
  };

  return (
    <div className="w-full flex flex-col items-center pt-4 pb-12">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
        }}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        id="hidden-screenshot-input"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) processFile(file);
        }}
        accept="image/*"
        capture="environment"
        className="hidden"
        id="hidden-camera-input"
      />

      {/* Main Upload Dropzone Card */}
      <div
        id="upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full rounded-[32px] p-8 sm:p-12 transition-all duration-200 cursor-pointer flex flex-col items-center text-center relative border-2 ${
          isDragging
            ? 'border-[#FF5500] bg-orange-50/50 scale-[1.01]'
            : 'border-neutral-200/90 bg-white hover:border-neutral-400 shadow-2xs hover:shadow-xs'
        }`}
      >
        {/* Central Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#141414] text-white flex items-center justify-center mb-6 shadow-sm">
          <Upload className="w-7 h-7 text-[#FF5500]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#141414] tracking-tight mb-2">
          Drop a message or screenshot
        </h3>

        <p className="text-xs sm:text-sm text-neutral-500 mb-8 max-w-xs font-normal">
          DMs, text messages, emails, or urgent payment requests
        </p>

        {/* Primary Action Button */}
        <button
          type="button"
          id="upload-action-btn"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-8 py-4 rounded-full bg-[#141414] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
        >
          <span className="text-[#FF5500] font-extrabold text-lg leading-none">+</span>
          <span>Upload screenshot</span>
        </button>

        {/* Supported Formats and Mobile Camera */}
        <div className="flex items-center justify-between w-full mt-8 pt-5 border-t border-neutral-100 text-[11px] text-neutral-400 font-semibold tracking-wider uppercase">
          <div className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>PNG • JPG • WEBP</span>
          </div>

          <button
            type="button"
            id="mobile-camera-btn"
            onClick={(e) => {
              e.stopPropagation();
              cameraInputRef.current?.click();
            }}
            className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera</span>
          </button>
        </div>
      </div>

      {/* Try sample messages button */}
      <div className="w-full mt-5">
        <button
          type="button"
          id="toggle-examples-btn"
          onClick={() => setShowExamples(!showExamples)}
          className="w-full py-3.5 px-6 rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-300 text-neutral-700 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors shadow-2xs"
        >
          <span>{showExamples ? 'Hide sample messages' : 'Or try a sample message'}</span>
        </button>
      </div>

      {/* Built-in Demo Examples Drawer */}
      {showExamples && (
        <div 
          id="demo-examples-container"
          className="w-full mt-4 p-5 rounded-[28px] bg-neutral-100/90 border border-neutral-200/80 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Sample Scenarios
            </span>
            <span className="text-[11px] text-neutral-500">
              Click to load and check
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {DEMO_EXAMPLES.map((example) => (
              <div
                key={example.id}
                id={`example-card-${example.id}`}
                onClick={() => handleExampleSelect(example)}
                className="cursor-pointer p-4 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-400 hover:shadow-xs transition-all active:scale-[0.99] flex flex-col gap-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900">
                      {example.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        example.expectedLevel === 'high'
                          ? 'bg-orange-100 text-[#FF5500]'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {example.expectedLevel === 'high' ? 'High Pressure' : 'Low Pressure'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#FF5500] flex items-center gap-0.5">
                    <span>Test this</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-xs text-neutral-600 font-mono bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 line-clamp-2">
                  "{example.messageText.replace(/\n/g, ' ')}"
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{example.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
