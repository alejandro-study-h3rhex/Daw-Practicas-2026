export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} <span className="font-semibold text-foreground">ProjectManager</span>.
                    </p>

                    <p className="text-center text-sm text-muted-foreground">
                        Developed by <a
                            href="https://github.com/h3rhex"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            h3rhex
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}