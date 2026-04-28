
export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-16 items-center justify-center">
                <span className="font-mono text-xl font-bold tracking-tight">
                    ProjectManager<span className="text-primary">.db</span>
                </span>
            </div>
        </header>
    )
}