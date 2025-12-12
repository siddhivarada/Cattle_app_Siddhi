'use client';

import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState(prev => ({
      errorCount: prev.errorCount + 1
    }));
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isCritical = this.state.errorCount > 2;

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle size={40} className="text-red-600" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 text-center mb-4">
              We encountered an unexpected error. Please try again.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 text-xs text-red-800 overflow-auto max-h-24">
                <strong>Error Details:</strong>
                <p className="mt-1 font-mono whitespace-pre-wrap break-words">
                  {this.state.error?.message}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              
              {isCritical && (
                <button
                  onClick={this.handleReload}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Reload Page
                </button>
              )}
              
              <a
                href="/"
                className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center block"
              >
                Go Home
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <p className="text-xs text-gray-500 text-center mt-4">
                Error count: {this.state.errorCount}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
