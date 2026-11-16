import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="min-h-screen bg-[#FBF8F1] text-[#132A20] flex items-center justify-center p-6"
        >
          <div className="max-w-lg w-full bg-[#F4EDE0] border border-[#DFD4BE] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#0E3B2C] mb-3">
              معذرت، صفحہ لوڈ کرنے میں دشواری پیش آئی
            </h2>
            <p className="text-base text-[#3D5247] mb-6">
              براہِ کرم صفحہ دوبارہ لوڈ کریں یا براہِ راست واٹس ایپ پر رابطہ کریں۔
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-[#0E3B2C] text-[#FBF8F1] font-semibold hover:bg-[#14533D] transition-colors cursor-pointer"
            >
              دوبارہ کوشش کریں
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
