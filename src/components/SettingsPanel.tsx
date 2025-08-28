import React from 'react';
import { ChatSettings } from '../types';
import { Eye, EyeOff, RotateCcw, Download, Upload } from 'lucide-react';

interface SettingsPanelProps {
  settings: ChatSettings;
  onSettingsChange: (settings: ChatSettings) => void;
  onExportChat: () => void;
  onImportChat: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearChat: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onExportChat,
  onImportChat,
  onClearChat,
}) => {
  const [showApiKey, setShowApiKey] = React.useState(false);

  const handleSettingChange = <K extends keyof ChatSettings>(
    key: K,
    value: ChatSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const models = [
    'gpt-4',
    'gpt-4-turbo-preview',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k',
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Settings</h2>
      
      {/* API Key */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          OpenAI API Key
        </label>
        <div className="relative">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={settings.apiKey}
            onChange={(e) => handleSettingChange('apiKey', e.target.value)}
            placeholder="sk-..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Model Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model
        </label>
        <select
          value={settings.model}
          onChange={(e) => handleSettingChange('model', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* Temperature */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Temperature: {settings.temperature}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={settings.temperature}
          onChange={(e) => handleSettingChange('temperature', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Conservative</span>
          <span>Creative</span>
        </div>
      </div>

      {/* Top P */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Top P: {settings.topP}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={settings.topP}
          onChange={(e) => handleSettingChange('topP', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Focused</span>
          <span>Diverse</span>
        </div>
      </div>

      {/* Top K */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Top K: {settings.topK === 0 ? 'Disabled' : settings.topK}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={settings.topK}
          onChange={(e) => handleSettingChange('topK', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Disabled (0)</span>
          <span>Limited (100)</span>
        </div>
      </div>

      {/* Max Tokens */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Tokens: {settings.maxTokens}
        </label>
        <input
          type="range"
          min="50"
          max="4000"
          step="50"
          value={settings.maxTokens}
          onChange={(e) => handleSettingChange('maxTokens', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50</span>
          <span>4000</span>
        </div>
      </div>

      {/* Presence Penalty */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Presence Penalty: {settings.presencePenalty}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={settings.presencePenalty}
          onChange={(e) => handleSettingChange('presencePenalty', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Repetitive</span>
          <span>Novel</span>
        </div>
      </div>

      {/* Frequency Penalty */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Frequency Penalty: {settings.frequencyPenalty}
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={settings.frequencyPenalty}
          onChange={(e) => handleSettingChange('frequencyPenalty', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Repetitive</span>
          <span>Varied</span>
        </div>
      </div>

      {/* System Prompt */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          System Prompt
        </label>
        <textarea
          value={settings.systemPrompt}
          onChange={(e) => handleSettingChange('systemPrompt', e.target.value)}
          placeholder="You are a helpful assistant..."
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onClearChat}
          className="w-full flex items-center justify-center gap-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear Chat
        </button>
        
        <button
          onClick={onExportChat}
          className="w-full flex items-center justify-center gap-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Chat
        </button>
        
        <label className="w-full flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
          <Upload className="w-4 h-4" />
          Import Chat
          <input
            type="file"
            accept=".json"
            onChange={onImportChat}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};