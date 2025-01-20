export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <svg
                className="animate-spin h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8 8 0 0017.709 20M20 12a8 8 0 01-8 8V24c6.627 0 12-5.373 12-12h-4z"
                ></path>
            </svg>
        </div>
    );
}
