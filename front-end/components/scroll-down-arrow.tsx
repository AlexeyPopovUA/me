'use client';

export function ScrollDownArrow() {
    return (
        <div className="mt-12 flex justify-center" aria-hidden="true">
            <svg
                width="48"
                height="14"
                viewBox="0 0 48 14"
                fill="none"
                className="text-primary animate-scroll-hint-glow"
            >
                <path
                    d="M2 2l22 10L46 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}
