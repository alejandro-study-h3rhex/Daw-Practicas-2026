export function Main({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto flex w-full flex-1 flex-col items-center justify-start px-1 py-4">
            {children}
        </main>
    )
}